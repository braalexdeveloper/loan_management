import type { LoanRequest } from "../interfaces/LoanRequest";

export const validateField = (name: string, value: string | number) => {
    let error = "";

    switch (name) {
        case "clientId":
            if (value === null || value === undefined || value === "" || Number(value)<=0) {
                error = "El campo Cliente es obligatorio";
            }
            break;
        case "amount":
            if (value === null || value === undefined || value === "" ) {
                error = "El campo Amount es obligatorio";
            }else if(Number(value)<=0){
                error = "El monto debe ser mayor a 0";
            }
            break;

        case "interestRate":
            if (value === null || value === undefined || value === "" ) {
                error = "El campo Interes es obligatorio";
            }else if(Number(value)<=0){
error = "El campo Interes debe ser mayor a 0";
            }
            break;

        case "installments":
            if (value === null || value === undefined || value === "" || Number(value)<1) {
                error = "El campo de Cuotas es obligatorio";
            }
            break;

        case "startDate":
            if (value === null || value === undefined || value === "") {
                error = "El campo Fecha de Inicio es obligatorio";
            }
            break;

        case "clientId":
            if (value === null || value === undefined || value === "") {
                error = "El cliente es obligatorio";
            }
            break;
    }

    return error;
};

export const validateLoan = (loan: LoanRequest) => {
    const newErrors: Record<string, string> = {};

    Object.entries(loan).forEach(([name, value]) => {
        const error = validateField(name, value);

        if (error) {
            newErrors[name] = error;
        }
    });

    console.log("errores: ", newErrors);

    return Object.entries(newErrors);
};