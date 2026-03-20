import React from 'react';
import Header from '../../components/layout/Header';
import BottomNav from './BottomNav';
import RoleSwitcher from './RoleSwitcher';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header title="CareBridge" />
      <RoleSwitcher />
      <main className="main-content">{children}</main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
