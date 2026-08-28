import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { type AppDispatch, type RootState } from "../../../store";
import { useEffect, useState } from "react";
import { getLoanByIdThunk, getLoansThunk } from "../store/LoanSlice";
import Modal from "../components/Modal";
import { type LoanI } from "../interfaces/LoanI";
import LoanDetailModal from "../components/LoanDetailModal";
import { Modal as BootstrapModal } from "bootstrap";

export default function LoansListPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { loans, loanState, loading, currentPage, totalLoans, totalPages } = useSelector((state: RootState) => state.loans);

    const formatearFecha = (fecha: string) => {
        const [anio, mes, dia] = fecha.split("-");
        return `${dia}/${mes}/${anio}`;
    }

    function itemPage(page: number) {

        dispatch(getLoansThunk({ page }));
    }

    const nextPage = () => {

        if (currentPage + 1 >= totalPages) {

            return;
        }
        dispatch(getLoansThunk({ page: currentPage + 1 }))
    }

    const prevPage = () => {

        if (currentPage <= 0) {

            return;
        }
        dispatch(getLoansThunk({ page: currentPage - 1 }))
    }
    //Modal payment
    const [loanModal, setLoanModal] = useState<LoanI | null>(null);
    const modalPayment = (loan: LoanI) => {
        setLoanModal(loan);
    }
    const [loanModalDetail, setLoanModalDetail] = useState<boolean>(false);
    const modalLoanDetail = (idLoan: number) => {
        dispatch(getLoanByIdThunk(idLoan))
        setLoanModalDetail(true);

    }

    //Buscar por prestamos por dni de cliente
    const [dni, setDni] = useState("");

    const onChangeSerachDni = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDni(e.target.value);
    }



    useEffect(() => {
        if (dni.trim() === "") {
            dispatch(getLoansThunk({}));
            return;
        }

        const timer = setTimeout(() => {
            dispatch(getLoansThunk({ dni }));
        }, 700);

        return () => clearTimeout(timer);
    }, [dni, dispatch]);

    useEffect(() => {
        if (!loanState) return;

        const element = document.getElementById("loanDetailModal");

        if (!element) return;

        const modal = BootstrapModal.getOrCreateInstance(element);

        modal.show();

        const handleClose = () => {
         setLoanModalDetail(false);
     };
 
     element.addEventListener("hidden.bs.modal", handleClose);
 
     return () => {
         element.removeEventListener("hidden.bs.modal", handleClose);
     };
 
    }, [loanState]);

    useEffect(() => {
        if (!loanModal) return;

        const element = document.getElementById("paymentModal");

        if (!element) return;

        const modal = BootstrapModal.getOrCreateInstance(element);

        modal.show();

        const handleClose = () => {
            setLoanModal(null);
        };

        element.addEventListener("hidden.bs.modal", handleClose);

        return () => {
            element.removeEventListener("hidden.bs.modal", handleClose);
        };

    }, [loanModal]);

    return (
        <div className="container-fluid">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                <div>
                    <h1 className="h3 mb-1 fw-semibold">
                        Prestamos
                    </h1>

                    <p className="text-muted mb-0">
                        Administra los prestamos registrados en el sistema.
                    </p>
                </div>

                <Link to={"/loans/create"} className="btn btn-primary mt-3 mt-md-0">
                    <i className="bi bi-person-plus me-2"></i>
                    Nuevo Prestamo
                </Link>

            </div>


            {/* Card */}
            <div className="card border-0 shadow-sm">

                {/* Card Header */}
                <div className="card-header bg-white border-bottom py-3">

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                        <div>
                            <h5 className="mb-1">
                                Lista de Prestamos
                            </h5>

                            <span className="text-muted small">
                                {totalLoans} prestamos registrados
                            </span>
                        </div>


                        {/* Search */}

                        <div className="input-group" style={{ maxWidth: "300px" }}>

                            <span className="input-group-text bg-white" >
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="text"
                                onChange={onChangeSerachDni}
                                value={dni}
                                className="form-control"
                                placeholder="Buscar por DNI"
                            />

                        </div>



                    </div>

                </div>


                {/* Table */}
                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>
                                    <th className="px-4">Monto</th>
                                    <th>Interes</th>
                                    <th>Cuotas</th>
                                    <th>Cuotas Pagadas</th>
                                    <th>Cuota a Pagar</th>
                                    <th>Total a Pagar</th>
                                    <th>Saldo</th>
                                    <th>Cliente</th>
                                    <th>Status</th>
                                    <th className="text-center">Acciones</th>
                                </tr>

                            </thead>


                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="text-center py-5"
                                        >

                                            <div
                                                className="spinner-border text-primary mb-3"
                                                role="status"
                                            >
                                                <span className="visually-hidden">
                                                    Cargando...
                                                </span>
                                            </div>

                                            <div className="text-muted">
                                                Cargando prestamos...
                                            </div>

                                        </td>

                                    </tr>

                                ) : loans.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={12}
                                            className="text-center py-5"
                                        >

                                            <i className="bi bi-people fs-1 text-muted"></i>

                                            <p className="mt-3 mb-1 fw-semibold">
                                                No hay prestamos registrados
                                            </p>

                                            <span className="text-muted">
                                                Comienza agregando tu primer prestamo.
                                            </span>

                                        </td>

                                    </tr>

                                ) : (

                                    loans.map((loan) => (

                                        <tr key={loan.id}>

                                            <td className="px-4 fw-semibold">
                                                s/ {loan.amount}
                                            </td>

                                            <td>
                                                {loan.interestRate}%
                                            </td>

                                            <td>
                                                <span >
                                                    {loan.installments}
                                                </span>
                                            </td>

                                            <td>
                                                {loan.paidInstallments}
                                            </td>

                                            <td>
                                                s/ {loan.installmentAmount}
                                            </td>

                                            <td>
                                                s/ {loan.totalLoan}
                                            </td>

                                            <td>
                                                s/ {loan.remainingBalance}
                                            </td>



                                            <td>
                                                {loan.clientName}
                                            </td>
                                            <td>
                                                <span className={"badge " + (loan.status === "PENDING" ? "text-bg-danger" : "text-bg-success")}>{loan.status}</span>
                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-sm btn-outline-warning"

                                                        onClick={() => modalLoanDetail(Number(loan.id))}
                                                        title="Ver detalle"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    {loan.status === "CANCELLED" ? "" :
                                                        <button
                                                            className="btn btn-sm btn-outline-success"

                                                            onClick={() => modalPayment(loan)}
                                                            title="Pagar Cuota"
                                                        >
                                                            <i className="bi-credit-card"></i>
                                                        </button>
                                                    }


                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* Card Footer */}
                {!loading && loans.length > 0 && (
                    <div className="card-footer bg-white border-top text-muted small">
                        Mostrando {loans.length} prestamos
                    </div>
                )}



            </div>
            {loanModal && (
                <Modal loanModal={loanModal} dispatch={dispatch} getLoansThunk={getLoansThunk} />
            )}

            {
                (loanModalDetail && loanState) && (
                    <LoanDetailModal loan={loanState} />
                )
            }


            {<div className="row py-4">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}><button className="page-link" onClick={prevPage}>Previous</button></li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={currentPage == index ? "page-item active" : "page-item"}><button className="page-link" onClick={() => itemPage(index)}>{index + 1}</button></li>
                        ))}


                        <li className={`page-item ${currentPage + 1 >= totalPages ? "disabled" : ""}`}><button className="page-link" disabled={currentPage + 1 >= totalPages} onClick={nextPage}>Next</button></li>
                    </ul>
                </nav>
            </div>}
        </div>
    )
}