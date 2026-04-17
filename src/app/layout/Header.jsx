import React from "react";
import { useApp } from "../providers/useApp";
import RoleSwitcher from "./RoleSwitcher";

const Header = ({
  title,
  subtitle,
  showGreeting = false,
  showSearch = false,
  searchPlaceholder = "Search anything...",
}) => {
  const { activeProfile } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const resolvedTitle = showGreeting
    ? `${getGreeting()}, ${activeProfile?.name || 'User'} 👋`
    : title;

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 bg-white">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text)]">{resolvedTitle}</h2>
        {subtitle ? <p className="text-sm text-[var(--muted)]">{subtitle}</p> : null}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {showSearch ? (
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm">
            <span className="text-[var(--muted)]">Search</span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-[200px] bg-transparent text-[var(--text)] placeholder:text-[var(--muted2)] focus:outline-none"
            />
          </div>
        ) : null}

        <RoleSwitcher />
      </div>
    </header>
  );
};

export default Header;