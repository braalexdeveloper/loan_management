import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../store";

import LoanForm from "../components/FormLoan";
import { getClientDniThunk } from "../../clients/store/clientSlice";
import type { LoanRequest } from "../interfaces/LoanRequest";
import { createLoanThunk } from "../store/LoanSlice";
import { validateField, validateLoan } from "../utils/LoanValidate";
import { alertError, alertSuccess } from "../../../utils/alertService";




export default function LoanCreatePage() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { clientByDni } = useSelector((state: RootState) => state.clients);

    const [loan, setLoan] = useState<LoanRequest>({
        amount: 0,
        interestRate: 0,
        installments: 1,
        startDate: '',
        clientId: 0,
    });

    const [dni, setDni] = useState("");
    const [clientName, setClientName] = useState("");
    const onChangeDni = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDni(e.target.value)
    }

    const searchDniClient = () => {
        console.log("dni", dni)
        if (!dni.trim()) {

            setLoan((prev: LoanRequest) => ({
                ...prev,
                ["clientId"]: 0,
            }));

            setClientName("");
            return;
        }
        dispatch(getClientDniThunk(dni));
        console.log("clients", clientByDni)


    }

    useEffect(() => {


        if (clientByDni.length > 0) {
            console.log("dentro de condicion", clientByDni)
            setLoan((prev: any) => ({
                ...prev,
                clientId: clientByDni[0].id,
            }));

            setClientName(clientByDni[0].name + " " + clientByDni[0].lastName);
        }
    }, [clientByDni])

    useEffect(() => {
        setLoan((prev: LoanRequest) => ({
            ...prev,
            ["clientId"]: 0,
        }));

        setClientName("");
    }, [])

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {


        setLoan((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        console.log(loan)

    }



    const onBlurValidateForm = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));

    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateForm = validateLoan(loan);
        console.log(validateForm)
        if (validateForm.length > 0) {
            validateForm.forEach(([name, error]) => {
                setErrors((prev) => ({
                    ...prev,
                    [name]: error
                }));
            });
            return;
        }

        const result = await dispatch(createLoanThunk(loan));
        if (createLoanThunk.fulfilled.match(result)) {
            alertSuccess("Éxito", "Prestamo creado correctamente");
            navigate("/loans")
        } else if (createLoanThunk.rejected.match(result)) {
            console.log("eeror api", result);
            alertError("Error", result.error.message ?? "Error al crear prestamo desde react")
        }

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            searchDniClient();
        }, 500);

        return () => clearTimeout(timer);
    }, [dni, dispatch]);

    return (
        <div className="container-fluid">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                <div>
                    <h1 className="h3 mb-1 fw-semibold">
                        Nuevo Prestamo
                    </h1>

                    <p className="text-muted mb-0">
                        Registra la información del nuevo prestamo.
                    </p>
                </div>

            </div>


            {/* Card */}
            <div className="card border-0 shadow-sm">

                {/* Card Header */}
                <div className="card-header bg-white border-bottom py-3">

                    <div className="d-flex align-items-center">

                        <div
                            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: "45px",
                                height: "45px",
                            }}
                        >
                            <i className="bi bi-person-plus fs-5"></i>
                        </div>

                        <div>
                            <h5 className="mb-1">
                                Información del prestamo
                            </h5>

                            <small className="text-muted">
                                Completa los datos del formulario.
                            </small>
                        </div>

                    </div>

                </div>

                <LoanForm loan={loan} errors={errors} onBlurValidateForm={onBlurValidateForm} handlerInput={handlerInput} submitForm={submitForm} clientName={clientName} dni={dni} onChangeDni={onChangeDni} searchDniClient={searchDniClient} />


            </div>

        </div>
    )


}
