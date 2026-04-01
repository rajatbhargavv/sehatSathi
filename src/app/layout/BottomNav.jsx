import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../providers/AppProvider';
import { ROLES } from '../../constants/config';
import { ROUTES } from '../../constants/routes';

const navItems = {
  [ROLES.ELDER]: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Reminders', path: ROUTES.REMINDERS },
    { label: 'Doctors', path: ROUTES.DOCTORS },
    { label: 'Tips', path: ROUTES.HEALTH_TIPS },
  ],
  [ROLES.FAMILY]: [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Reminders', path: ROUTES.REMINDERS },
    { label: 'Hospitals', path: ROUTES.HOSPITALS },
    { label: 'Tips', path: ROUTES.HEALTH_TIPS },
  ],
};

const BottomNav = () => {
  const { role } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const items = navItems[role] ?? navItems[ROLES.ELDER];

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.path}
          aria-label={item.label}
          className={`bottom-nav__item ${
            location.pathname.startsWith(item.path) ? 'active' : ''
          }`}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;