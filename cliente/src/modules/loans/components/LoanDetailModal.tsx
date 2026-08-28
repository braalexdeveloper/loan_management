import React, { useState } from "react";
import "./LoanDetailModal.css";
import type { LoanI } from "../interfaces/LoanI";



interface LoanDetailModalProps {
    loan: LoanI;
}

const LoanDetailModal: React.FC<LoanDetailModalProps> = ({ loan }) => {

    const [selectedImage, setSelectedImage] = useState<string|null>(null);

    const progress =
        loan.installments > 0
            ? (loan.paidInstallments / loan.installments) * 100
            : 0;

    return (
        <div
            className="modal fade"
            id="loanDetailModal"
            tabIndex={-1}
            aria-labelledby="loanDetailModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content loan-detail-modal">

                    {/* HEADER */}
                    <div className="modal-header">
                        <div>
                            <h5
                                className="modal-title fw-bold"
                                id="loanDetailModalLabel"
                            >
                                Detalle del préstamo
                            </h5>

                            <small className="text-muted">
                                Préstamo #{loan.id}
                            </small>
                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Cerrar"
                        />
                    </div>

                    {/* BODY */}
                    <div className="modal-body p-4">

                        {/* CLIENTE */}
                        <div className="loan-client-card mb-4">

                            <div>
                                <span className="text-muted small">
                                    Cliente
                                </span>

                                <h5 className="fw-bold mb-0">
                                    {loan.clientName}
                                </h5>
                            </div>

                            <span
                                className={`badge rounded-pill px-3 py-2 ${loan.status === "CANCELLED"
                                    ? "bg-success"
                                    : loan.status === "DFS"
                                        ? "bg-primary"
                                        : "bg-danger"
                                    }`}
                            >
                                {loan.status}
                            </span>

                        </div>

                        {/* RESUMEN */}
                        <h6 className="section-title mb-3">
                            Resumen financiero
                        </h6>

                        <div className="row g-3 mb-4">

                            <div className="col-md-3">
                                <div className="loan-stat-card">
                                    <span className="text-muted small">
                                        Monto solicitado
                                    </span>

                                    <h4 className="fw-bold mb-0">
                                        S/ {loan.amount.toFixed(2)}
                                    </h4>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="loan-stat-card">
                                    <span className="text-muted small">
                                        Total del préstamo
                                    </span>

                                    <h4 className="fw-bold mb-0">
                                        S/ {loan.totalLoan.toFixed(2)}
                                    </h4>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="loan-stat-card">
                                    <span className="text-muted small">
                                        Valor de cuota
                                    </span>

                                    <h4 className="fw-bold mb-0">
                                        S/ {loan.installmentAmount.toFixed(2)}
                                    </h4>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="loan-stat-card">
                                    <span className="text-muted small">
                                        Saldo pendiente
                                    </span>

                                    <h4 className="fw-bold text-danger mb-0">
                                        S/ {loan.remainingBalance.toFixed(2)}
                                    </h4>
                                </div>
                            </div>

                        </div>

                        {/* DATOS DEL PRÉSTAMO */}
                        <h6 className="section-title mb-3">
                            Información del préstamo
                        </h6>

                        <div className="row g-3 mb-4">

                            <div className="col-md-3">
                                <div className="loan-info-item">
                                    <span>Tasa de interés</span>
                                    <strong>
                                        {loan.interestRate}%
                                    </strong>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="loan-info-item">
                                    <span>Número de cuotas</span>
                                    <strong>
                                        {loan.installments}
                                    </strong>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="loan-info-item">
                                    <span>Fecha de inicio</span>
                                    <strong>
                                        {loan.startDate}
                                    </strong>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="loan-info-item">
                                    <span>Fecha de finalización</span>
                                    <strong>
                                        {loan.endDate}
                                    </strong>
                                </div>
                            </div>

                        </div>

                        {/* PROGRESO */}
                        <div className="loan-progress-card mb-4">

                            <div className="d-flex justify-content-between align-items-center mb-2">

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Progreso del préstamo
                                    </h6>

                                    <small className="text-muted">
                                        {loan.paidInstallments} de{" "}
                                        {loan.installments} cuotas pagadas
                                    </small>
                                </div>

                                <strong>
                                    {Math.round(progress)}%
                                </strong>

                            </div>

                            <div
                                className="progress"
                                style={{ height: "9px" }}
                            >
                                <div
                                    className="progress-bar bg-success"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>

                        </div>

                        {/* CRONOGRAMA */}
                        <div className="mb-3">

                            <h6 className="section-title mb-1">
                                Cronograma de pagos
                            </h6>

                            <small className="text-muted">
                                Detalle de las cuotas del préstamo
                            </small>

                        </div>

                        <div className="table-responsive loan-schedule-container">

                            <table className="table table-hover align-middle mb-0">

                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha de pago</th>
                                        <th>Cuota</th>
                                        <th>Capital</th>
                                        <th>Interés</th>
                                        <th>Metodo de Pago</th>
                                        <th>Comprobante</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {loan.payments.map((pay: any, index: any) => (
                                        <tr key={pay.id}>
                                            <td>{index + 1}</td>
                                            <td>{pay.paymentDate}</td>

                                            <td>
                                                S/{" "}
                                                {pay.amount.toFixed(2)}
                                            </td>

                                            <td>
                                                S/ {(loan.amount / loan.installments).toFixed(2)}
                                            </td>

                                            <td>
                                                S/ {(((loan.amount * loan.interestRate) / 100) / loan.installments).toFixed(2)}
                                            </td>

                                            <td>
                                                {pay.methodPayment}
                                            </td>

                                            <td>
                                                {pay.imagePayment ? (
                                                    <img
                                                    className="img-thumbnail"
                                                    src={`http://localhost:8080/uploads/payments/${pay.imagePayment}`}
                                                    width={80}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() =>
                                                        setSelectedImage(`http://localhost:8080/uploads/payments/${pay.imagePayment}`)}
                                                />
                                                ) : "No hay imagen"}
                                            </td>
                                        </tr>
                                    ))}



                                </tbody>

                            </table>
                            {selectedImage && (
    <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        onClick={() => setSelectedImage(null)}
    >
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0">

                <div className="modal-body text-center position-relative">

                    <button
                        type="button"
                        className="btn-close btn-close-white position-absolute top-0 end-0"
                        onClick={() => setSelectedImage(null)}
                    />

                    <img src={selectedImage}
                        className="img-fluid rounded"
                        style={{
                            maxHeight: '90vh',
                            objectFit: 'contain'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />

                </div>

            </div>
        </div>
    </div>
)}

                        </div>

                    </div>

                    {/* FOOTER */}
                    <div className="modal-footer">
                         <a
                            href={`http://localhost:8080/api/loans/${loan.id}/pdf`}
                            className="btn btn-warning"
                            
                        >
                            Descargar Cronograma en PDF
                        </a>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoanDetailModal;