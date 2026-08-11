import { Repository } from "typeorm";
import { Payment } from "./payment.entity";

import { RequestPaymentDto } from "./dtos/RequestPaymentDto";
import { Loan, LoanStatus } from "../loans/loan.entity";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { AppDataSource } from "../../config/db";

export class PaymentService {
    
    constructor(
        private paymentRepository: Repository<Payment>,
        private loanRepository: Repository<Loan>
    ) {}

    async getPayments() {
        return this.paymentRepository.find();
    }

    async createPayment(payment: RequestPaymentDto) {
        return await AppDataSource.transaction(async (manager)=>{
            const loanRepo=manager.getRepository(Loan);
            const paymentRepo=manager.getRepository(Payment);

           const foundLoan = await loanRepo.findOne({
            where: { id: payment.loanId }
        });

        if (!foundLoan) {
            throw new NotFoundError("Préstamo no encontrado.");
        }

        if (foundLoan.status === LoanStatus.PAID) {
            throw new BadRequestError("El préstamo ya está pagado.");
        }

        if (payment.amount <= 0) {
    throw new BadRequestError(
        "El monto del pago debe ser mayor que cero."
    );
}

        if (payment.amount > foundLoan.remainingBalance) {
            throw new BadRequestError(
                "El monto excede el saldo pendiente."
            );
        }

        const newPayment =paymentRepo.create(payment);

        newPayment.installmentNumber =
            foundLoan.paidInstallments + 1;

        newPayment.loan = foundLoan;

        await paymentRepo.save(newPayment);

        foundLoan.remainingBalance -= payment.amount;

        foundLoan.paidInstallments += 1;

        if (foundLoan.remainingBalance <= 0) {
            foundLoan.remainingBalance = 0;
            foundLoan.status = LoanStatus.PAID;
        }

        await loanRepo.save(foundLoan);

        return newPayment;
        });

        
    }

    async deletePayment(id:number){
        return await AppDataSource.transaction(async (manager)=>{
            const loanRepo=manager.getRepository(Loan);
            const paymentRepo=manager.getRepository(Payment);

            const foundPayment=await paymentRepo
                .createQueryBuilder("payment")
                .leftJoinAndSelect("payment.loan","loan")
                .where("payment.id = :id",{id})
                .getOne();

            if(!foundPayment){
                throw new NotFoundError("Pago no encontrado!");
            }

            const foundLoan=foundPayment.loan;

            const subsequentPayments=await paymentRepo
                .createQueryBuilder("payment")
                .innerJoin("payment.loan","loan")
                .where("loan.id = :loanId",{loanId:foundLoan.id})
                .andWhere("payment.installmentNumber > :installmentNumber",{
                    installmentNumber:foundPayment.installmentNumber
                })
                .getMany();

            foundLoan.remainingBalance=
                Number(foundLoan.remainingBalance)+Number(foundPayment.amount);
            foundLoan.paidInstallments=Math.max(0,foundLoan.paidInstallments-1);

            if(foundLoan.status===LoanStatus.PAID){
                foundLoan.status=LoanStatus.PENDING;
            }

            for(const payment of subsequentPayments){
                payment.installmentNumber-=1;
            }

            await paymentRepo.remove(foundPayment);
            await paymentRepo.save(subsequentPayments);
            await loanRepo.save(foundLoan);
        });
    }
}
