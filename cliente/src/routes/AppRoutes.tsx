import { BrowserRouter,Routes,Route } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout.tsx";
import ClientListPage from "../modules/clients/pages/ClientListPage.tsx";
import DashboardPage from "../modules/dashboard/pages/DashboardPage.tsx";
import ClientCreatePage from "../modules/clients/pages/ClientCreatePage.tsx";
import ClientEditPage from "../modules/clients/pages/ClientEditPage.tsx";
import LoansListPage from "../modules/loans/pages/LoansListPage.tsx";
import LoanCreatePage from "../modules/loans/pages/LoanCreatePage.tsx";

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<DashboardLayout/>}>
               <Route index element={<DashboardPage/>}/>
               <Route path="/dashboard" element={<DashboardPage/>}/>
               <Route path="/clients/create" element={<ClientCreatePage/>}/>
               <Route path="/clients" element={<ClientListPage/>}/>
               <Route path="/clients/edit/:id" element={<ClientEditPage/>}/>
               
               <Route path="/loans" element={<LoansListPage/>}/>
               <Route path="/loans/create" element={<LoanCreatePage/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}