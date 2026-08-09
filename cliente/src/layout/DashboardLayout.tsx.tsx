import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex">

      <Sidebar 
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div 
        className="flex-grow-1"
        style={{ minHeight: "100vh" }}
      >

        <Topbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="bg-light p-4 mainClass">
          <Outlet />
        </main>

      </div>


      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-lg-none"
          style={{ zIndex: 1020 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}