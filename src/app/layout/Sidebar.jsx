import React from "react";
import { Link, useLocation } from "react-router-dom";
import RoleSwitcher from "./RoleSwitcher";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Reminders", path: "/reminders", icon: "💊" },
    { name: "Doctors", path: "/doctors", icon: "🩺" },
    { name: "Hospitals", path: "/hospitals", icon: "🏥" },
    { name: "Tips", path: "/health-tips", icon: "💡" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-[220px] bg-white border-r border-[var(--border)] p-4 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <h1 className="text-xl font-bold text-[var(--primary)] mb-6">
          CareBridge
        </h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition 
                  ${isActive 
                    ? "bg-green-100 text-green-700 font-medium" 
                    : "hover:bg-gray-100"
                  }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div>
        <RoleSwitcher />
      </div>
    </aside>
  );
};

export default Sidebar;