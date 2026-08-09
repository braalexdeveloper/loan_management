export default function DashboardPage(){
return(
    <>
      <h1>Dashboard</h1>

                <div className="row mt-4">

                    <div className="col-md-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5>Clientes</h5>
                                <h2>150</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5>Préstamos</h5>
                                <h2>52</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5>Pagos</h5>
                                <h2>31</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5>Pendientes</h5>
                                <h2>8</h2>
                            </div>
                        </div>
                    </div>

                </div>
    </>
)
}