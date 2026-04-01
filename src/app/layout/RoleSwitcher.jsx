// TEMP – for testing elder/family
import React from 'react';
import { useApp } from '../providers/useApp';
import { ROLES } from '../../constants/config';

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div className="role-switcher">
      <span>View as:</span>
      {Object.values(ROLES).map((r) => (
        <button
          key={r}
          className={role === r ? 'active' : ''}
          onClick={() => setRole(r)}
        >
          {r}
        </button>
      ))}
    </div>
  );
};

export default RoleSwitcher;
