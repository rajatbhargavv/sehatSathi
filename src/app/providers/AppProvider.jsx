// Global state provider
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_ROLE } from '../../constants/config';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(DEFAULT_ROLE);

  const value = { role, setRole };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};