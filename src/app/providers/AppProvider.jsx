// Global state provider
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_ROLE } from '../../constants/config';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(DEFAULT_ROLE);

  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
