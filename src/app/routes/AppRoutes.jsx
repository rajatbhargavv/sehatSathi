import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import HomePage from "../../features/home/HomePage";
import ReminderPage from "../../features/reminders/ReminderPage";
import DoctorPage from "../../features/doctors/DoctorPage";
import HospitalPage from "../../features/hospitals/HospitalPage";
import HealthTipPage from "../../features/healthTips/HealthTipPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          
          {/* default route */}
          <Route index element={<Navigate to="home" />} />

          <Route path="home" element={<HomePage />} />
          <Route path="reminders" element={<ReminderPage />} />
          <Route path="doctors" element={<DoctorPage />} />
          <Route path="hospitals" element={<HospitalPage />} />
          <Route path="health-tips" element={<HealthTipPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;