import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Client } from "../clients/client.entity";
import { Payment } from "../payments/payment.entity";

export enum LoanStatus {
    PENDING = "pending",
    PAID = "paid",
    OVERDUE = "overdue",
    CANCELLED = "cancelled"
}

@Entity("loans")
export class Loan {

    @PrimaryGeneratedColumn()
    id!: number;

    // Monto prestado
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    amount!: number;

    // Interés (%)
    @Column({
        type: "decimal",
        precision: 5,
        scale: 2
    })
    interestRate!: number;

    // Cantidad de cuotas
    @Column()
    installments!: number;

    // Valor de cada cuota
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    installmentAmount!: number;

    // Total a pagar
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    totalAmount!: number;

    // Saldo restante
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    remainingBalance!: number;

    // Cuotas pagadas
    @Column({
        default: 0
    })
    paidInstallments!: number;

    // Fecha de inicio
    @Column({
        type: "date"
    })
    startDate!: Date;

    // Fecha de vencimiento
    @Column({
        type: "date"
    })
    endDate!: Date;

    @Column({
        type: "enum",
        enum: LoanStatus,
        default: LoanStatus.PENDING
    })
    status!: LoanStatus;

    @ManyToOne(() => Client, client => client.loans, {
        nullable: false,
        onDelete: "CASCADE"
    })
    client!: Client;

    @OneToMany(()=>Payment,payment=>payment.loan)
    payments!:Payment[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}