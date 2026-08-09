
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "../loans/loan.entity";


@Entity()
export class Client{
    @PrimaryGeneratedColumn()
    id!:number;
   
    @Column()
    name!:string;
    
    @Column()
    lastName!:string;
      
    @Column({unique:true})
    dni!:string;

    @Column({unique:true})
    email!:string;

    @Column()
    phone!:string;

    @Column()
    address!:string;

    @OneToMany(()=>Loan,loan=>loan.client)
    loans!:Loan[];

}