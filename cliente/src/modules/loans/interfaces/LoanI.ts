export interface LoanI{
    id?:number;
    amount:number;
    totalLoan:number;
    interestRate:number;
    installments:number;
    installmentAmount:number;
    remainingBalance:number;
    paidInstallments:number;
    startDate:string;
    endDate:string;
    status:string;
    clientName:string;
}