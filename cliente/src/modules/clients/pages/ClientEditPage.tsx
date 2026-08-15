import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../store";
import { getClientByIdThunk, updatedClientThunk } from "../store/clientSlice";
import ClientForm from "../components/ClientForm";
import { alertError, alertSuccess } from "../../../utils/alertService";
import type { ClientI } from "../interfaces/ClientI";
import { validateClient, validateField } from "../utils/clientValidation";

export default function ClientCreatePage() {
    const { getClient } = useSelector((state: RootState) => state.clients);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const idClient = useParams().id;

    const [client, setClient] = useState<ClientI>({
        id: 0,
        name: "",
        lastName: "",
        dni: "",
        email: "",
        phone: "",
        address: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    
       
    
       
     const onBlurValidateForm = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));


    }

    const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!validateClient(client)){
          return;
        }

        try {
            const response = await dispatch(updatedClientThunk(client)).unwrap();

            console.log("responseUnwrap", response);
            alertSuccess("Éxito", response.msg);
            navigate("/clients");
        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                alertError("Error", error.message);
            } else {
                alertError("Error", "Ocurrió un error inesperado");
            }
        }



    }

    useEffect(() => {
        if (idClient) {
            dispatch(getClientByIdThunk(Number(idClient)));
        }

    }, [dispatch, idClient]);

    useEffect(() => {
        if (getClient) {
            setClient(getClient);
            console.log("de api :", getClient);
        }
    }, [getClient]);


    return (
        <div className="container-fluid">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                <div>
                    <h1 className="h3 mb-1 fw-semibold">
                        Editar cliente
                    </h1>

                    <p className="text-muted mb-0">
                        Registra la información del nuevo cliente.
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
                                Información del cliente
                            </h5>

                            <small className="text-muted">
                                Completa los datos personales y de contacto.
                            </small>
                        </div>

                    </div>

                </div>

                <ClientForm client={client} errors={errors} onBlurValidateForm={onBlurValidateForm} handlerInput={handlerInput} submitForm={submitForm}/>


            </div>

        </div>
    )


}