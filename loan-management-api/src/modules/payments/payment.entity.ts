import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Loan } from "../loans/loan.entity";

export enum PaymentMethod {
    CASH = "cash",
    YAPE = "yape",
    PLIN = "plin",
    BANK_TRANSFER = "bank_transfer"
}

@Entity("payments")
export class Payment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    amount!: number;

    @Column({
        type: "timestamp"
    })
    paymentDate!: Date;

    @Column()
    installmentNumber!: number;

    @Column({
        type: "enum",
        enum: PaymentMethod
    })
    paymentMethod!: PaymentMethod;

    @ManyToOne(() => Loan, loan => loan.payments, {
        nullable: false,
        onDelete: "CASCADE"
    })
    loan!: Loan;

    @CreateDateColumn()
    createdAt!: Date;
}