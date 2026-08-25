import { Link } from "react-router-dom";

import type { LoanRequest } from "../interfaces/LoanRequest";


interface LoanFormProps {
    loan: LoanRequest;
    
    clientName:string;
    dni:string;
    onChangeDni:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    errors?: Partial<Record<keyof LoanRequest, string>>;
    onBlurValidateForm?: any;
    handlerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
    searchDniClient:() => void;
}

export default function LoanForm({ loan,searchDniClient,clientName, dni,onChangeDni,errors, onBlurValidateForm, handlerInput, submitForm }: LoanFormProps) {
    return (
        <>
            {/* Form */}
            < form onSubmit={submitForm} >

                {/* Card Body */}
                < div className="card-body p-4" >

                    {/* Datos personales */}
                    < div className="mb-4" >

                        <h6 className="fw-semibold mb-3">
                            <i className="bi bi-person me-2 text-primary"></i>
                            Buscar Cliente
                        </h6>

                        <div className="row g-3">
                            {/* Buscar cliente por dni*/}
                            <div className="col-md-6">


                                <input
                                    type="text"
                                    id="dni"
                                    name="dni"
                                    value={dni}
                                    onChange={onChangeDni}
                                    className={`form-control`}
                                    placeholder="Ingrese el dni del cliente"
                                />

                            </div>
                            <div className="col-md-6">
                                <input
                                    type="hidden"
                                    id="clientId"
                                    name="clientId"
                                    
                                    value={loan.clientId}
                                />
                                <input
                                    type="text"
                                    id="clientName"
                                    name="clientName"
                                    value={clientName}
                                    disabled
                                    
                                    className={`form-control ${errors?.clientId && loan.clientId==0 ? "is-invalid" : ""}`}
                                />
{errors?.clientId && loan.clientId==0 && <div className="invalid-feedback">{errors.clientId}</div>}


                            </div>


                            <hr className="my-4" />

                            {/* Nombre */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="amount"
                                    className="form-label"
                                >
                                    Monto de Prestamo
                                </label>

                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    onChange={handlerInput}
                                    onBlur={onBlurValidateForm}
                                    value={loan.amount}
                                    className={`form-control ${errors?.amount ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el nombre"
                                />
                                {errors?.amount && <div className="invalid-feedback">{errors.amount}</div>}

                            </div>

                            {/* interes */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="interestRate"
                                    className="form-label"
                                >
                                    Interes
                                </label>

                                <input
                                    type="number"
                                    id="interestRate"
                                    name="interestRate"
                                    onChange={handlerInput}
                                    value={loan.interestRate}
                                    onBlur={onBlurValidateForm}
                                    className={`form-control ${errors?.interestRate ? "is-invalid" : ""}`}
                                    placeholder="Ingrese los apellidos"
                                />
                                {errors?.interestRate && <div className="invalid-feedback">{errors.interestRate}</div>}

                            </div>

                            {/* Cuotas */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="installments"
                                    className="form-label"
                                >
                                    N° Cuotas
                                </label>

                                <input
                                    type="number"
                                    id="installments"
                                    name="installments"
                                    onChange={handlerInput}
                                    value={loan.installments}
                                    onBlur={onBlurValidateForm}
                                    className={`form-control ${errors?.installments ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el DNI"
                                    maxLength={8}
                                />
                                {errors?.installments && <div className="invalid-feedback">{errors.installments}</div>}

                            </div>

                            <div className="col-md-6">

                                <label
                                    htmlFor="startDate"
                                    className="form-label"
                                >
                                    Fecha de Prestamo
                                </label>

                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    onChange={handlerInput}
                                    value={loan.startDate}
                                    onBlur={onBlurValidateForm}
                                    className={`form-control ${errors?.startDate ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el DNI"
                                    maxLength={8}
                                />
                                {errors?.startDate && <div className="invalid-feedback">{errors.startDate}</div>}

                            </div>

                        </div>

                    </div >



                </div >


                {/* Footer */}
                < div className="card-footer bg-white border-top p-3" >

                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                        <Link
                            to="/loans"
                            className="btn btn-light border"
                        >
                            <i className="bi bi-x-lg me-2"></i>
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-check-lg me-2"></i>
                            Guardar Prestamo
                        </button>

                    </div>

                </div >

            </form >
        </>
    )
}
