import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { PaymentMethod } from "../payment.entity";


export class RequestPaymentDto {

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    amount!: number;

    @IsNotEmpty()
    paymentMethod!: PaymentMethod;

    @IsDateString()
    paymentDate!: Date;

    @IsNotEmpty()
    loanId!: number;
}