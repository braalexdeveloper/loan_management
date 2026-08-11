import { Router } from "express";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { validateDto } from "../../middleware/validateDto";
import { RequestPaymentDto } from "./dtos/RequestPaymentDto";
import { AppDataSource } from "../../config/db";
import { Payment } from "./payment.entity";
import { Loan } from "../loans/loan.entity";

const router=Router();

const paymentRepository=AppDataSource.getRepository(Payment);
const loanRepository=AppDataSource.getRepository(Loan);

const paymentService=new PaymentService(paymentRepository,loanRepository);
const paymentController=new PaymentController(paymentService);

router.get(
    "/payments",
    paymentController.getPayments.bind(paymentController)
);

router.post('/payments',validateDto(RequestPaymentDto),paymentController.createPayment.bind(paymentController));

router.delete('/payments/:id',paymentController.deletePayment.bind(paymentController));

export default router;
