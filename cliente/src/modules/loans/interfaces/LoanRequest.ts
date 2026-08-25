export interface LoanRequest{
    amount:number; 
    interestRate:number;
    installments:number;
    startDate:string;
    clientId:number;
}