import React from 'react';
import { useApp } from '../providers/useApp';
import { ROLES } from '../../constants/config';

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg)] p-1">

      {Object.values(ROLES).map((r) => (
        <button
          key={r}
          aria-label={`Switch to ${r} view`}
          className={`rounded-lg px-4 py-1 text-sm font-semibold transition-colors ${
            role === r
              ? r === ROLES.ELDER
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--family)] text-white'
              : r === ROLES.ELDER
                ? 'text-[var(--muted)] hover:bg-[var(--green-50)]'
                : 'text-[var(--muted)] hover:bg-[var(--family-lt)]'
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