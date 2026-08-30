import {
    FaUsers,
    FaMoneyBillWave,
    FaCreditCard,
    FaClock,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";
import { getDashboard } from "../service/DashboardService";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const [itemDashboard,setItemDashboard]=useState({
        cantClients:0,
        cantLoans:0,
        cantLoansPayment:0,
        cantLoansActive:0,
        totalLoansAmount:0
    });

    

   useEffect(() => {
    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setItemDashboard(data);
        } catch (error) {
            console.error("Error al cargar dashboard:", error);
        }
    };

    loadDashboard();
}, []);

    return (
        <div className="container-fluid py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Dashboard</h2>
                    <p className="text-muted mb-0">
                        Resumen general del sistema de préstamos
                    </p>
                </div>

                <button className="btn btn-primary">
                    <FaMoneyBillWave className="me-2" />
                    Nuevo préstamo
                </button>
            </div>


            {/* Indicadores */}
            <div className="row g-4 mb-4">

                {/* Clientes */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-2">
                                        Clientes
                                    </p>

                                    <h2 className="fw-bold mb-2">
                                        {itemDashboard.cantClients}
                                    </h2>

                                    <small className="text-success">
                                        <FaArrowUp className="me-1" />
                                        12% este mes
                                    </small>
                                </div>

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#e8f1ff",
                                        color: "#0d6efd"
                                    }}
                                >
                                    <FaUsers size={22} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Préstamos */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-2">
                                        Préstamos
                                    </p>

                                    <h2 className="fw-bold mb-2">
                                        {itemDashboard.cantLoans}
                                    </h2>

                                    <small className="text-success">
                                        <FaArrowUp className="me-1" />
                                        8.5% este mes
                                    </small>
                                </div>

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#e9f8ef",
                                        color: "#198754"
                                    }}
                                >
                                    <FaCreditCard size={22} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Pagos */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-2">
                                        Prestamos Pagados
                                    </p>

                                    <h2 className="fw-bold mb-2">
                                        {itemDashboard.cantLoansPayment}
                                    </h2>

                                    <small className="text-success">
                                        <FaArrowUp className="me-1" />
                                        5.2% este mes
                                    </small>
                                </div>

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#fff4e5",
                                        color: "#fd7e14"
                                    }}
                                >
                                    <FaMoneyBillWave size={22} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Pendientes */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-2">
                                        Prestamos Activos
                                    </p>

                                    <h2 className="fw-bold mb-2">
                                        {itemDashboard.cantLoansActive}
                                    </h2>

                                    <small className="text-danger">
                                        <FaArrowDown className="me-1" />
                                        3.1% este mes
                                    </small>
                                </div>

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#fdeaea",
                                        color: "#dc3545"
                                    }}
                                >
                                    <FaClock size={22} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            {/* Resumen financiero */}
            <div className="row g-4 mb-4">

                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Resumen financiero
                                    </h5>

                                    <p className="text-muted mb-0 small">
                                        Estado general de los préstamos
                                    </p>
                                </div>

                                <select className="form-select form-select-sm w-auto">
                                    <option>Este mes</option>
                                    <option>Últimos 3 meses</option>
                                    <option>Este año</option>
                                </select>
                            </div>

                            <div className="row text-center">

                                <div className="col-md-4 mb-3 mb-md-0">
                                    <p className="text-muted mb-1">
                                        Capital prestado
                                    </p>

                                    <h4 className="fw-bold">
                                        S/ {itemDashboard.totalLoansAmount}
                                    </h4>
                                </div>

                                <div className="col-md-4 mb-3 mb-md-0">
                                    <p className="text-muted mb-1">
                                        Total cobrado
                                    </p>

                                    <h4 className="fw-bold text-success">
                                        S/ 18,750.00
                                    </h4>
                                </div>

                                <div className="col-md-4">
                                    <p className="text-muted mb-1">
                                        Por cobrar
                                    </p>

                                    <h4 className="fw-bold text-danger">
                                        S/ 6,650.00
                                    </h4>
                                </div>

                            </div>

                            <hr />

                            {/* Barra de progreso */}
                            <div className="mb-2 d-flex justify-content-between">
                                <small className="text-muted">
                                    Recuperación de cartera
                                </small>

                                <small className="fw-bold">
                                    73.8%
                                </small>
                            </div>

                            <div
                                className="progress"
                                style={{ height: "8px" }}
                            >
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: "73.8%" }}
                                />
                            </div>

                        </div>
                    </div>
                </div>


                {/* Estado de préstamos */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-4">
                                Estado de préstamos
                            </h5>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">
                                    Activos
                                </span>

                                <span className="badge bg-success-subtle text-success">
                                    {itemDashboard.cantLoansActive}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">
                                    Pagados
                                </span>

                                <span className="badge bg-primary-subtle text-primary">
                                    {itemDashboard.cantLoansPayment}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">
                                    Pendientes
                                </span>

                                <span className="badge bg-warning-subtle text-warning">
                                    5
                                </span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span className="text-muted">
                                    Vencidos
                                </span>

                                <span className="badge bg-danger-subtle text-danger">
                                    3
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            {/* Últimos préstamos */}
            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h5 className="fw-bold mb-1">
                                Últimos préstamos
                            </h5>

                            <p className="text-muted small mb-0">
                                Préstamos registrados recientemente
                            </p>
                        </div>

                        <button className="btn btn-outline-primary btn-sm">
                            Ver todos
                        </button>

                    </div>


                    <div className="table-responsive">

                        <table className="table align-middle mb-0">

                            <thead className="table-light">
                                <tr>
                                    <th>Cliente</th>
                                    <th>Monto</th>
                                    <th>Cuotas</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>
                                        <div className="fw-semibold">
                                            Juan Pérez
                                        </div>
                                        <small className="text-muted">
                                            DNI: 12345678
                                        </small>
                                    </td>

                                    <td className="fw-semibold">
                                        S/ 2,500.00
                                    </td>

                                    <td>
                                        12 cuotas
                                    </td>

                                    <td>
                                        28/08/2026
                                    </td>

                                    <td>
                                        <span className="badge bg-success-subtle text-success px-3 py-2">
                                            Activo
                                        </span>
                                    </td>
                                </tr>


                                <tr>
                                    <td>
                                        <div className="fw-semibold">
                                            María López
                                        </div>
                                        <small className="text-muted">
                                            DNI: 87654321
                                        </small>
                                    </td>

                                    <td className="fw-semibold">
                                        S/ 1,800.00
                                    </td>

                                    <td>
                                        10 cuotas
                                    </td>

                                    <td>
                                        27/08/2026
                                    </td>

                                    <td>
                                        <span className="badge bg-warning-subtle text-warning px-3 py-2">
                                            Pendiente
                                        </span>
                                    </td>
                                </tr>


                                <tr>
                                    <td>
                                        <div className="fw-semibold">
                                            Carlos Ramírez
                                        </div>
                                        <small className="text-muted">
                                            DNI: 45678912
                                        </small>
                                    </td>

                                    <td className="fw-semibold">
                                        S/ 3,200.00
                                    </td>

                                    <td>
                                        18 cuotas
                                    </td>

                                    <td>
                                        26/08/2026
                                    </td>

                                    <td>
                                        <span className="badge bg-primary-subtle text-primary px-3 py-2">
                                            Pagado
                                        </span>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}
