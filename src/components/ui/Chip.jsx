import React from 'react';

const Chip = ({
  label,
  icon,
  avatar,
  avatarAlt = '',
  selected = false,
  onClick,
  disabled = false,
  as = 'button',
  customTone = false,
  className = '',
  ...rest
}) => {
  const toneClass = customTone
    ? ''
    : selected
      ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
      : 'bg-white border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]';

  const baseClass = `
    inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium
    border transition
    ${toneClass}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;

  if (as === 'span') {
    return (
      <span className={baseClass.replace('hover:border-[var(--primary)] hover:text-[var(--primary)]', '')} {...rest}>
        {avatar ? (
          <img
            src={avatar}
            alt={avatarAlt || `${label} avatar`}
            className="h-4 w-4 rounded-full object-cover"
          />
        ) : null}
        {icon ? <span className="mr-1">{icon}</span> : null}
        <span>{label}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      {...rest}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={avatarAlt || `${label} avatar`}
          className="h-4 w-4 rounded-full object-cover"
        />
      ) : null}
      {icon ? <span className="mr-1">{icon}</span> : null}
      <span>{label}</span>
    </button>
  );
};

export default Chip;
