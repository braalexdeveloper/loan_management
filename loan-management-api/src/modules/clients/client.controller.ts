import { NextFunction, Request, Response } from "express";
import { ClientService } from "./client.service"


export class ClientController{
    private clientService:ClientService;

    constructor(){
        this.clientService=new ClientService();
    }

    async getClients(req:Request,res:Response){
       
        const clients=await this.clientService.getClients();
        res.status(200).json(clients);
      
    }

    async createClient(req:Request,res:Response,next:NextFunction){
        try {
            const client=await this.clientService.createClient(req.body);
            res.status(201).json({msg:"Cliente creado correctamente!",client});
        } catch (error) {
            next(error);
        }
    }

    async updateClient(req:Request,res:Response){
       
            const updatedClient=await this.clientService.updateClient(req.body,Number(req.params.id));
            res.status(200).json({msg:"Cliente actualizado correctamente!",updatedClient});
       
    }

    async deleteClient(req:Request,res:Response){
        
            await this.clientService.deleteClient(Number(req.params.id));
            res.status(200).json({msg:"Cliente eliminado correctamente!"});
        
    }
}