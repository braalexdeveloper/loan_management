import { Request,Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController{
    
    constructor(private paymentService:PaymentService){}

    async getPayments(req:Request,res:Response){
      const payments=await this.paymentService.getPayments();
      res.status(200).json(payments);
    }

    async createPayment(req:Request,res:Response){
        const payment=await this.paymentService.createPayment(req.body);
        res.status(201).json({msg:"Pago creado con éxito",payment});
    }

    async deletePayment(req:Request,res:Response){
        await this.paymentService.deletePayment(Number(req.params.id));
        res.status(200).json({msg:"Pago eliminado correctamente!"});
    }

}
