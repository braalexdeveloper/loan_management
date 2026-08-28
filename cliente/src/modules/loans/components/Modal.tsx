import { useEffect, useState } from "react";
import type { LoanI } from "../interfaces/LoanI";
import { createPayment } from "../service/PaymentService";
import { alertError, alertSuccess } from "../../../utils/alertService";


interface ModalI {
    loanModal: LoanI;
    dispatch:any;
    getLoansThunk:any
}
export default function Modal({ loanModal,dispatch,getLoansThunk }: ModalI) {
   

    const [payment, setPayment] = useState({
        idLoan: 0,
        methodPayment: "",
        paymentDate: new Date().toISOString().split("T")[0],
        imagePayment: null as File | null
    });



    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target;

        if (target instanceof HTMLInputElement && target.type === "file") {
            setPayment((prev) => ({
                ...prev,
                [target.name]: target.files?.[0] ?? null
            }));

            return;
        }

        setPayment((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const submitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();
        form.append("paymentDate", payment.paymentDate);
        form.append("methodPayment", payment.methodPayment);
        if (payment.imagePayment) {
            form.append("imagePayment", payment.imagePayment);
        }
        form.append("loanId", payment.idLoan.toString());
try {
    const response = await createPayment(form);
        console.log(response)

        const closeButton = document.getElementById("btnOcultarModal");

        if (closeButton) {
            (closeButton as HTMLButtonElement).click();
        }

        alertSuccess("Éxito","Pago creado con éxito");
        dispatch(getLoansThunk({}));
        setPayment({
        idLoan: 0,
        methodPayment: "",
        paymentDate: new Date().toISOString().split("T")[0],
        imagePayment: null as File | null
          })
} catch (error) {
    console.log(error);
    alertError("Error","Hubo un error al pagar cuota")
}
        


    }

    useEffect(() => {
        setPayment((prev) => ({
            ...prev,
            idLoan: loanModal ? Number(loanModal.id) : 0
        }));

    }, [loanModal])

    useEffect(() => {
        console.log(loanModal)
        console.log(payment)
    }, [payment])

   
    return (

        <>
            <div
                className="modal fade"
                id="paymentModal"
                tabIndex={-1}
                aria-labelledby="paymentModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        {/* Header */}
                        <div className="modal-header">
                            <h5 className="modal-title" id="paymentModalLabel">
                                Registrar Pago
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={submitPayment}>
                            {/* Body */}
                            <div className="modal-body">

                                {/* Información del préstamo */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        Cliente
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={loanModal?.clientName}
                                        disabled
                                    />
                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label text-muted">
                                            Saldo pendiente
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                S/
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={loanModal?.remainingBalance}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="paymentAmount"
                                            className="form-label"
                                        >
                                            Monto a pagar
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                S/
                                            </span>

                                            <input
                                                type="number"
                                                className="form-control"
                                                id="paymentAmount"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                value={loanModal?.installmentAmount}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>



                                {/* Fecha y método */}
                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="paymentDate"
                                            className="form-label"
                                        >
                                            Fecha de pago
                                        </label>

                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="paymentDate"
                                            name="paymentDate"
                                            value={payment.paymentDate}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="paymentMethod"
                                            className="form-label"
                                        >
                                            Método de pago
                                        </label>

                                        <select
                                            className="form-select"
                                            id="paymentMethod"
                                            name="methodPayment"
                                            value={payment.methodPayment}
                                            onChange={handleInput}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="EFECTIVO">Efectivo</option>
                                            <option value="YAPE">Yape</option>
                                            <option value="PLIN">Plin</option>
                                            <option value="TRANSFERENCIA">Transferencia</option>
                                        </select>
                                    </div>

                                </div>

                                {/* Número de operación */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="operationNumber"
                                        className="form-label"
                                    >
                                        Comprobante de pago
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        name="imagePayment"

                                        accept="image/*"
                                        onChange={handleInput}
                                    />
                                </div>

                                

                            </div>

                            {/* Footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    id="btnOcultarModal"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-success"

                                >
                                    <i className="bi bi-credit-card me-2"></i>
                                    Registrar pago
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}