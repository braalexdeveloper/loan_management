import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../store";
import { useEffect, useState } from "react";
import { deleteClientThunk, getClientsThunk } from "../store/clientSlice";
import { Link } from "react-router-dom";
import { alertConfirm, alertSuccess } from "../../../utils/alertService";

export default function ClientListPage() {
    const dispatch = useDispatch<AppDispatch>();

    const { clients, totalClients, currentPage, totalPages, loading, responseDeleteClient } = useSelector(
        (state: RootState) => state.clients
    );
    const [searchDni,setSearchDni]=useState("");


    const deleteClient = async (id: number) => {

        const result = await alertConfirm("¡Cuidado!", "Estas seguro de eliminar cliente!");
        console.log(result)
        if (result.isConfirmed) {
            const resultDelete = await dispatch(deleteClientThunk(id));
            if (deleteClientThunk.fulfilled.match(resultDelete)) {
                await dispatch(getClientsThunk({}));
                console.log(responseDeleteClient);
                await alertSuccess("Éxito", "Cliente eliminado con éxito!");
            }

        }

    }

  
    function itemPage(page: number) {
        
        dispatch(getClientsThunk({page}));
    }

    const nextPage=()=>{
        
        if(currentPage+1>=totalPages){
            
           return;
        }
        dispatch(getClientsThunk({page:currentPage+1}))
    }

    const prevPage=()=>{
        
         if(currentPage<=0){
            
           return;
        }
        dispatch(getClientsThunk({page:currentPage-1}))
    }

   useEffect(() => {
    if (searchDni.trim() === "") {
            dispatch(getClientsThunk({}));
            return;
        }
    const timer = setTimeout(() => {
         
            dispatch(getClientsThunk({ dni: searchDni }));
        
    }, 500);

    return () => clearTimeout(timer);
}, [searchDni, dispatch]);

    return (
        <div className="container-fluid">

            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                <div>
                    <h1 className="h3 mb-1 fw-semibold">
                        Clientes
                    </h1>

                    <p className="text-muted mb-0">
                        Administra los clientes registrados en el sistema.
                    </p>
                </div>

                <Link to={"/clients/create"} className="btn btn-primary mt-3 mt-md-0">
                    <i className="bi bi-person-plus me-2"></i>
                    Nuevo cliente
                </Link>

            </div>


            {/* Card */}
            <div className="card border-0 shadow-sm">

                {/* Card Header */}
                <div className="card-header bg-white border-bottom py-3">

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                        <div>
                            <h5 className="mb-1">
                                Lista de clientes
                            </h5>

                            <span className="text-muted small">
                                {totalClients} clientes registrados
                            </span>
                        </div>


                        {/* Search */}
                        <div className="input-group" style={{ maxWidth: "300px" }}>

                            <span className="input-group-text bg-white" >
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="text"
                                onChange={(e)=>setSearchDni(e.target.value)}
                                value={searchDni}
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
                                    <th className="px-4">Nombre</th>
                                    <th>Apellidos</th>
                                    <th>DNI</th>
                                    <th>Email</th>
                                    <th>Celular</th>
                                    <th>Dirección</th>
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
                                                Cargando clientes...
                                            </div>

                                        </td>

                                    </tr>

                                ) : clients.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="text-center py-5"
                                        >

                                            <i className="bi bi-people fs-1 text-muted"></i>

                                            <p className="mt-3 mb-1 fw-semibold">
                                                No hay clientes registrados
                                            </p>

                                            <span className="text-muted">
                                                Comienza agregando tu primer cliente.
                                            </span>

                                        </td>

                                    </tr>

                                ) : (

                                    clients.map((client) => (

                                        <tr key={client.id}>

                                            <td className="px-4 fw-semibold">
                                                {client.name}
                                            </td>

                                            <td>
                                                {client.lastName}
                                            </td>

                                            <td>
                                                <span className="badge text-bg-light border">
                                                    {client.dni}
                                                </span>
                                            </td>

                                            <td>
                                                {client.email}
                                            </td>

                                            <td>
                                                {client.phone}
                                            </td>

                                            <td>
                                                {client.address}
                                            </td>

                                            <td>

                                                <div className="d-flex justify-content-center gap-2">

                                                    <Link to={"/clients/edit/" + client.id}
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="Editar cliente"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        title="Eliminar cliente" onClick={() => deleteClient(Number(client.id))}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>

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
                {!loading && clients.length > 0 && (
                    <div className="card-footer bg-white border-top text-muted small">
                        Mostrando {clients.length} clientes
                    </div>
                )}



            </div>

            <div className="row py-4">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage== 0 ? "disabled" : ""}`}><button className="page-link" onClick={prevPage}>Previous</button></li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={currentPage==index ? "page-item active" : "page-item"}><button className="page-link" onClick={()=>itemPage(index)}>{index + 1}</button></li>
                        ))}


                        <li className={`page-item ${currentPage+1 >= totalPages ? "disabled" : ""}`}><button className="page-link" disabled={currentPage + 1 >= totalPages}  onClick={nextPage}>Next</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}