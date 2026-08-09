import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../store";
import { createClientThunk } from "../store/clientSlice";
import ClientForm from "../components/ClientForm";
import { alertError, alertSuccess } from "../../../utils/alertService";

export default function ClientCreatePage() {
    const { responseCreateClient,error } = useSelector((state: RootState) => state.clients);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [client, setClient] = useState({
        name: '',
        lastName: '',
        dni: '',
        email: '',
        phone: '',
        address: ''
    });

    const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await dispatch(createClientThunk(client));

        
        if (createClientThunk.fulfilled.match(result)) {
            console.log(responseCreateClient);
            alertSuccess("Éxito",responseCreateClient.msg);
            navigate("/clients");
        }else if(createClientThunk.rejected.match(result)){
            alertError("Error",error ?? "Error al crear cliente desde react")
        }
    }


return (
    <div className="container-fluid">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

            <div>
                <h1 className="h3 mb-1 fw-semibold">
                    Nuevo cliente
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

             <ClientForm client={client} handlerInput={handlerInput} submitForm={submitForm} />
            

        </div>

    </div>
)


}