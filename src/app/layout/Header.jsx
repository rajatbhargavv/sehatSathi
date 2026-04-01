import React from 'react';
import { useApp } from '../providers/AppProvider';

const Header = ({ title = "SehatSathi" }) => {
  const { role } = useApp();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      
      {/* App Title */}
      <h1 className="text-xl font-bold text-blue-600">
        {title}
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        
        {/* Role Display */}
       <span className="text-sm px-3 py-1 rounded bg-gray-100">
  {role === "elder" ? "Elder View" : "Family View"}
</span>

      </div>
    </header>
  );
};

export default Header;