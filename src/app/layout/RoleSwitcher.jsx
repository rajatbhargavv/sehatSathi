// TEMP – for testing elder/family
import React from 'react';
import { useApp } from '../providers/AppProvider';
import { ROLES } from '../../constants/config';

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center gap-2 p-2">
      <span>View as:</span>

      {Object.values(ROLES).map((r) => (
        <button
          key={r}
          aria-label={`Switch to ${r} view`}
          className={`px-3 py-1 rounded ${
            role === r ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setRole(r)}
        >
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RoleSwitcher;