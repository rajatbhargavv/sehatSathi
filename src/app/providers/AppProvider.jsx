// Global state provider
import React, { useMemo, useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { DEFAULT_ROLE } from "../../constants/config";
import { clearSession, getAccountByUsername, getSession } from "../../services/authService";

export const AppProvider = ({ children }) => {
  const [session, setSessionState] = useState(() => getSession());

  const account = useMemo(
    () => (session?.username ? getAccountByUsername(session.username) : null),
    [session?.username]
  );

  const activeProfile = session?.activeProfile ?? null;
  const role = activeProfile?.role ?? DEFAULT_ROLE;

  const refreshAuth = () => {
    setSessionState(getSession());
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  const value = {
    session,
    isAuthenticated: Boolean(session?.isAuthenticated && session?.activeProfile),
    account,
    activeProfile,
    role,
    relationId: session?.relationId ?? null,
    username: session?.username ?? null,
    refreshAuth,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
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