import { Repository } from "typeorm";
import { Loan } from "./loan.entity";

import { RequestDtoLoan } from "./dtos/RequestDtoLoan";
import { Client } from "../clients/client.entity";
import { NotFoundError } from "../../errors/NotFoundError";


export class LoanService {
    
    constructor(
        private loanRepository: Repository<Loan>,
    private clientRepository: Repository<Client>
    ) {}

    async getLoans() {
        return await this.loanRepository.find();
    }

    async createLoan(loan: RequestDtoLoan) {

        const foundClient = await this.clientRepository.findOne({
            where: { id: loan.clientId }
        });

        if (!foundClient) {
            throw new NotFoundError("Cliente no encontrado!");
        }

        const totalAmount =
            loan.amount + (loan.amount * loan.interestRate) / 100;

        const installmentAmount =
            totalAmount / loan.installments;

        const remainingBalance = totalAmount;

        const endDate = new Date(loan.startDate);
        endDate.setMonth(endDate.getMonth() + loan.installments);

        const createLoan = this.loanRepository.create({
            amount: loan.amount,
            interestRate: loan.interestRate,
            installments: loan.installments,
            startDate: loan.startDate,
            endDate,
            totalAmount,
            installmentAmount,
            remainingBalance
        });

        createLoan.client = foundClient;

        return await this.loanRepository.save(createLoan);
    }
}