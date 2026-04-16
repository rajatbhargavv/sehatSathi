import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import HomePage from "../../features/home/HomePage";
import ReminderPage from "../../features/reminders/ReminderPage";
import DoctorPage from "../../features/doctors/DoctorPage";
import HospitalPage from "../../features/hospitals/HospitalPage";
import HealthTipPage from "../../features/healthTips/HealthTipPage";
import LoginPage from "../../features/auth/LoginPage";
import SignupPage from "../../features/auth/SignupPage";
import { ProtectedRoute, PublicOnlyRoute } from "./RouteGuards";
import { ROUTES } from "../../constants/routes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.ROOT} element={<MainLayout />}>
            <Route index element={<Navigate to={ROUTES.HOME} replace />} />

            <Route path="home" element={<HomePage />} />
            <Route path="reminders" element={<ReminderPage />} />
            <Route path="doctors" element={<DoctorPage />} />
            <Route path="hospitals" element={<HospitalPage />} />
            <Route path="health-tips" element={<HealthTipPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;