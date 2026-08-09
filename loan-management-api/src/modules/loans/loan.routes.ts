import { Router } from "express";
import { LoanController } from "./loan.controller";
import { validateDto } from "../../middleware/validateDto";
import { RequestDtoLoan } from "./dtos/RequestDtoLoan";
import { Client } from "../clients/client.entity";
import { Loan } from "./loan.entity";
import { AppDataSource } from "../../config/db";
import { LoanService } from "./loan.service";


const router=Router();

const clientRepository=AppDataSource.getRepository(Client);
const loanRepository=AppDataSource.getRepository(Loan);
const laonService=new LoanService(loanRepository,clientRepository);

const loanController=new LoanController(laonService);

router.get('/loans',loanController.getLoan.bind(loanController));
router.post('/loans',validateDto(RequestDtoLoan),loanController.createLoan.bind(loanController));

export default router;