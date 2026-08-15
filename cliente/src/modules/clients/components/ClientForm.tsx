import { Link } from "react-router-dom";
import type { ClientI } from "../interfaces/ClientI";

interface ClientFormProps {
    client: ClientI;
    errors?: Partial<Record<keyof ClientI, string>>;
    onBlurValidateForm:any;
    handlerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ClientForm({ client,errors,onBlurValidateForm, handlerInput, submitForm }: ClientFormProps) {
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
                            Datos personales
                        </h6>

                        <div className="row g-3">

                            {/* Nombre */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="name"
                                    className="form-label"
                                >
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handlerInput}
                                    onBlur={onBlurValidateForm}
                                    value={client.name}
                                    className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el nombre"
                                />
                                {errors?.name && <div className="invalid-feedback">{errors.name}</div>}

                            </div>

                            {/* Apellidos */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="lastName"
                                    className="form-label"
                                >
                                    Apellidos
                                </label>

                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    onChange={handlerInput}
                                    value={client.lastName}
                                    onBlur={onBlurValidateForm}
                                    className={`form-control ${errors?.lastName ? "is-invalid" : ""}`}
                                    placeholder="Ingrese los apellidos"
                                />
                                {errors?.lastName && <div className="invalid-feedback">{errors.lastName}</div>}

                            </div>

                            {/* DNI */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="dni"
                                    className="form-label"
                                >
                                    DNI
                                </label>

                                <input
                                    type="text"
                                    id="dni"
                                    name="dni"
                                    onChange={handlerInput}
                                    value={client.dni}
                                    onBlur={onBlurValidateForm}
                                    className={`form-control ${errors?.dni ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el DNI"
                                    maxLength={8}
                                />
                                {errors?.dni && <div className="invalid-feedback">{errors.dni}</div>}

                            </div>

                        </div>

                    </div >


                    <hr className="my-4" />


                    {/* Datos de contacto */}
                    <div className="mb-4">

                        <h6 className="fw-semibold mb-3">
                            <i className="bi bi-telephone me-2 text-primary"></i>
                            Información de contacto
                        </h6>

                        <div className="row g-3">

                            {/* Email */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >
                                    Correo electrónico
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white">
                                        <i className="bi bi-envelope"></i>
                                    </span>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handlerInput}
                                        value={client.email}
                                        onBlur={onBlurValidateForm}
                                        className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                                        placeholder="ejemplo@correo.com"
                                    />

                                </div>
                                {errors?.email && <div className="invalid-feedback d-block">{errors.email}</div>}

                            </div>


                            {/* Celular */}
                            <div className="col-md-6">

                                <label
                                    htmlFor="phone"
                                    className="form-label"
                                >
                                    Celular
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white">
                                        <i className="bi bi-phone"></i>
                                    </span>

                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        onChange={handlerInput}
                                        value={client.phone}
                                        onBlur={onBlurValidateForm}
                                        className={`form-control ${errors?.phone ? "is-invalid" : ""}`}
                                        placeholder="Ingrese el número de celular"
                                    />

                                </div>
                                {errors?.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}

                            </div>


                            {/* Dirección */}
                            <div className="col-12">

                                <label
                                    htmlFor="address"
                                    className="form-label"
                                >
                                    Dirección
                                </label>

                                <div className="input-group">

                                    <span className="input-group-text bg-white">
                                        <i className="bi bi-geo-alt"></i>
                                    </span>

                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        onChange={handlerInput}
                                        value={client.address}
                                        onBlur={onBlurValidateForm}
                                        className={`form-control ${errors?.address ? "is-invalid" : ""}`}
                                        placeholder="Ingrese la dirección"
                                    />

                                </div>
                                {errors?.address && <div className="invalid-feedback d-block">{errors.address}</div>}

                            </div>

                        </div>

                    </div>

                </div >


                {/* Footer */}
                < div className="card-footer bg-white border-top p-3" >

                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

                        <Link
                            to="/clients"
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
                            Guardar cliente
                        </button>

                    </div>

                </div >

            </form >
        </>
    )
}
