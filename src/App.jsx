import React from 'react';
import { AppProvider } from './app/providers/AppProvider';
import AppRoutes from './app/routes/AppRoutes';
import './App.css';
import { migrateLegacyKeys } from './utils/storage';

// Migrate old carebridge_* localStorage keys to current sehatsathi_* keys if present
const LEGACY_STORAGE_KEY_MAP = {
  carebridge_doctors: 'sehatsathi_doctors',
  carebridge_reminders: 'sehatsathi_reminders',
  carebridge_hospitals: 'sehatsathi_hospitals',
  carebridge_health_tips: 'sehatsathi_health_tips',
};

migrateLegacyKeys(LEGACY_STORAGE_KEY_MAP);

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
