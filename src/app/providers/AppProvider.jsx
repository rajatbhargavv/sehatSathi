// Global state provider
import React, { useState } from 'react';
import { DEFAULT_ROLE } from '../../constants/config';
import { AppContext } from './AppContext';

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(DEFAULT_ROLE);

  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};
