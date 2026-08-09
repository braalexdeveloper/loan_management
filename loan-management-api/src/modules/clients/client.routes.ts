import { Router } from "express";
import { ClientController } from "./client.controller";
import { validateDto } from "../../middleware/validateDto";
import { createClientDto } from "./dtos/createClientDto";
import { updateClientDto } from "./dtos/updateClientDto";


const route=Router();
const clientController=new ClientController();

route.get('/clients',clientController.getClients.bind(clientController));
route.post('/clients',validateDto(createClientDto),clientController.createClient.bind(clientController));
route.put('/clients/:id',validateDto(updateClientDto),clientController.updateClient.bind(clientController));
route.delete('/clients/:id',clientController.deleteClient.bind(clientController));

export default route;