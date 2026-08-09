interface Props {
  toggleSidebar: () => void;
}


export default function Topbar({toggleSidebar}: Props){

return (

<nav className="navbar navbar-expand bg-white shadow-sm px-3">

    <button
        className="btn btn-light d-lg-none"
        onClick={toggleSidebar}
    >
        <i className="bi bi-list fs-3"></i>
    </button>


    <div className="ms-auto dropdown">

        <button
            className="btn btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
        >
            <i className="bi bi-person-circle me-2"></i>
            Usuario
        </button>


        <ul className="dropdown-menu dropdown-menu-end">

            <li>
                <button className="dropdown-item">
                    Perfil
                </button>
            </li>

            <li>
                <button className="dropdown-item">
                    Cerrar sesión
                </button>
            </li>

        </ul>

    </div>


</nav>

)

}