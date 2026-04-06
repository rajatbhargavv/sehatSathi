// Global state provider
import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("elder");

  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access context easily
export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
};