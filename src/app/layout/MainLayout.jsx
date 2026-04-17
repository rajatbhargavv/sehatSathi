import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const location = useLocation();

  const headerByPath = {
    "/home": {
      showGreeting: true,
      subtitle: "Stay on top of your health today",
      showSearch: false,
      searchPlaceholder: "Search anything...",
    },
    "/reminders": {
      title: "Reminders & Medications",
      showSearch: false,
      searchPlaceholder: "Search reminders...",
    },
    "/doctors": {
      title: "Find Doctors Nearby",
      showSearch: false,
    },
    "/hospitals": {
      title: "Nearby Hospitals",
      showSearch: false,
    },
    "/health-tips": {
      title: "Daily Health Tips",
      showSearch: false,
    },
  };

  const headerProps = headerByPath[location.pathname] ?? {
    title: "SehatSathi",
    showSearch: false,
  };

  return (
    <div className="flex h-screen bg-[var(--bg)] text-[var(--text)]">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-white border-b border-[var(--border)]">
          <Header {...headerProps} />
        </div>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;