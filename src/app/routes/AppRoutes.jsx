import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import MainLayout from '../layout/MainLayout';

import HomePage from '../../features/home/HomePage';
import ReminderPage from '../../features/reminders/ReminderPage';
import DoctorPage from '../../features/doctors/DoctorPage';
import HospitalPage from '../../features/hospitals/HospitalPage';
import HealthTipPage from '../../features/healthTips/HealthTipPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.REMINDERS} element={<ReminderPage />} />
          <Route path={ROUTES.DOCTORS} element={<DoctorPage />} />
          <Route path={ROUTES.HOSPITALS} element={<HospitalPage />} />
          <Route path={ROUTES.HEALTH_TIPS} element={<HealthTipPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;