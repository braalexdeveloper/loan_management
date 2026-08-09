import {
    IsDateString,
    IsInt,
    IsNumber,
    IsPositive
} from "class-validator";

export class RequestDtoLoan {

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsNumber()
    @IsPositive()
    interestRate!: number;

    @IsInt()
    @IsPositive()
    installments!: number;

    @IsDateString()
    startDate!: Date;

    @IsInt()
    @IsPositive()
    clientId!: number;
}