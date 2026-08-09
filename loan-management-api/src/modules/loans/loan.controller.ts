import { Request,Response } from "express";
import { LoanService } from "./loan.service";


export class LoanController{
    

    constructor(private loanService:LoanService){
    }

    async getLoan(req:Request,res:Response){
       const loans=await this.loanService.getLoans();
       res.status(200).json(loans);
    }

    async createLoan(req:Request,res:Response){
        const loan=await this.loanService.createLoan(req.body);
        res.status(201).json({msg:"Prestamo creado con éxito!",loan});
    }
}