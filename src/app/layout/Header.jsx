import React from "react";
import { useApp } from "../providers/AppProvider";

const Header = () => {
  const { role } = useApp();

  // Mock user (later you can move this to context)
  const user = {
    name: role === "elder" ? "Arjun Kumar" : "Rahul Kumar",
  };

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      
      {/* LEFT SECTION */}
      <div>
        <h2 className="text-lg font-semibold">
          {getGreeting()}, {user.name} 👋
        </h2>
        <p className="text-sm text-gray-500">
          Stay on top of your health today
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search anything..."
          className="px-3 py-2 border rounded-lg text-sm w-[220px] focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Notification Bell */}
        <button className="text-xl">
          🔔
        </button>

        {/* Role Badge */}
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            role === "elder"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {role === "elder" ? "Elder" : "Family"}
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default Header;