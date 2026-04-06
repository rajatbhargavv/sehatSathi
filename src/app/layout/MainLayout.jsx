import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import BottomNav from './BottomNav';
import RoleSwitcher from './RoleSwitcher';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header title="CareBridge" />
      <RoleSwitcher />
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
