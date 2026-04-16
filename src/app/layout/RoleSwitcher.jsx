import React from 'react';
import { useApp } from '../providers/useApp';

const RoleSwitcher = () => {
  const { activeProfile, role, logout } = useApp();

  if (!activeProfile) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-1.5">
      <span
        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
          role === 'elder' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--family)] text-white'
        }`}
      >
        {role}
      </span>
      <span className="text-xs text-[var(--muted)] px-1">{activeProfile.name}</span>
      <button
        className="rounded-lg px-2 py-1 text-xs font-semibold text-[var(--danger)] hover:bg-[var(--danger-lt)]"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default RoleSwitcher;