// Changes based on role
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../providers/useApp';
import { ROLES } from '../../constants/config';
import { ROUTES } from '../../constants/routes';

const allNavItems = [
  { label: 'Reminders', path: ROUTES.REMINDERS },
  { label: 'Doctors', path: ROUTES.DOCTORS },
  { label: 'Hospitals', path: ROUTES.HOSPITALS },
  { label: 'Tips', path: ROUTES.HEALTH_TIPS },
];

const roleNavItems = {
  [ROLES.ELDER]: ['Reminders', 'Doctors', 'Tips'],
  [ROLES.FAMILY]: ['Reminders', 'Hospitals', 'Tips'],
};

const BottomNav = () => {
  const { role } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const allowedLabels = roleNavItems[role] ?? roleNavItems[ROLES.ELDER];
  const items = allNavItems.filter((item) => allowedLabels.includes(item.label));

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.path}
          className={`bottom-nav__item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
