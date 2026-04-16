import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../providers/useApp';
import { ROUTES } from '../../constants/routes';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export const PublicOnlyRoute = () => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};
