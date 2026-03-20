import React from 'react';
import { AppProvider } from './app/providers/AppProvider';
import AppRoutes from './app/routes/AppRoutes';
import './styles/index.css';

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
