import { Repository } from "typeorm";
import { Client } from "./client.entity";
import { AppDataSource } from "../../config/db";
import { createClientDto } from "./dtos/createClientDto";
import { updateClientDto } from "./dtos/updateClientDto";
import { NotFoundError } from "../../errors/NotFoundError";


export class ClientService{
    private clientRepository:Repository<Client>;

    constructor(){
        this.clientRepository=AppDataSource.getRepository(Client);
    }

    async getClients(){
        return await this.clientRepository.find();
    }

    async createClient(client:createClientDto){
      return await this.clientRepository.save(client);
    }

    async updateClient(client:updateClientDto,id:number){
      const foundClient=await this.clientRepository.findOne({where:{id}});
      if(!foundClient) throw new NotFoundError("Cliente no encontrado!");

      Object.assign(foundClient,client);
      await this.clientRepository.save(foundClient);
      return foundClient;
    }

    async deleteClient(id:number){
        const foundClient=await this.clientRepository.findOne({where:{id}});
        if(!foundClient) throw new NotFoundError("Cliente no encontrado!");

        await this.clientRepository.remove(foundClient);
    }

}