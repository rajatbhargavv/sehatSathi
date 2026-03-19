// Role-based routing logic
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useApp } from '../providers/AppProvider';
import MainLayout from '../layout/MainLayout';
import ReminderPage from '../../features/reminders/ReminderPage';
import DoctorPage from '../../features/doctors/DoctorPage';
import HospitalPage from '../../features/hospitals/HospitalPage';
import HealthTipPage from '../../features/healthTips/HealthTipPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.REMINDERS} replace />} />
          <Route path={ROUTES.REMINDERS} element={<ReminderPage />} />
          <Route path={ROUTES.DOCTORS} element={<DoctorPage />} />
          <Route path={ROUTES.HOSPITALS} element={<HospitalPage />} />
          <Route path={ROUTES.HEALTH_TIPS} element={<HealthTipPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
