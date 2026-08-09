import { NavLink } from "react-router-dom";

interface Props {
    open: boolean;
    closeSidebar: () => void;
}


export default function Sidebar({ open,closeSidebar }: Props) {

const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "bi-speedometer2",
    },
    {
      name: "Clientes",
      path: "/clients",
      icon: "bi-people",
    },
    {
      name: "Préstamos",
      path: "/loans",
      icon: "bi-wallet2",
    },
    {
      name: "Pagos",
      path: "/payments",
      icon: "bi-credit-card",
    },
    {
      name: "Reportes",
      path: "/reports",
      icon: "bi-bar-chart",
    },
  ];
    return (

        <aside
            className={`
bg-dark text-white position-fixed top-0 start-0 h-100
${open ? "translate-show" : ""}
`}

            style={{
                width: "260px",
                zIndex: 1030,
                transition: "0.3s",
            }}

        >

            <div className="p-3 border-bottom">

                <h4 className="mb-0">
                    <i className="bi bi-cash-stack me-2"></i>
                    Préstamos
                </h4>

            </div>


            <ul className="nav flex-column p-3">

       {
        menuItems.map((item)=>(
          <li key={item.path} className="nav-item mb-1">

                    <NavLink to={item.path} onClick={closeSidebar} className={({isActive}) =>
                    `
                    nav-link 
                    text-white 
                    rounded
                    ${isActive ? "active-menu" : ""}
                    `
                  }>

                        <i className={`bi ${item.icon} me-3`}></i>

                  {item.name}

                    </NavLink>

                </li>
        ))
       }
                
                
            </ul>


        </aside>

    )

}