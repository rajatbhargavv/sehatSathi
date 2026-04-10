import React from "react";

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  readOnly = false,
  label,
  error,
  icon,
  className = "",
  multiline = false,
  rows = 3,
  ...rest
}) => {
  return (
    <div className="w-full space-y-1">
      
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      )}

      {/* Wrapper */}
      <div className="relative">
        
        {/* Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)] text-sm">
            {icon}
          </span>
        )}

        {/* Input or Textarea */}
        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            className={`
              w-full rounded-xl bg-white text-sm
              px-3 py-2 outline-none transition resize-none
              ${icon ? "pl-10" : ""}
              ${
                error
                  ? "border border-[var(--danger)] focus:ring-2 focus:ring-[var(--danger-lt)]"
                  : "border border-[var(--border)] focus:ring-2 focus:ring-[var(--green-300)]"
              }
              ${disabled ? "opacity-60 cursor-not-allowed" : ""}
              ${className}
            `}
            {...rest}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`
              w-full rounded-xl bg-white text-sm
              px-3 py-2 outline-none transition
              ${icon ? "pl-10" : ""}
              ${
                error
                  ? "border border-[var(--danger)] focus:ring-2 focus:ring-[var(--danger-lt)]"
                  : "border border-[var(--border)] focus:ring-2 focus:ring-[var(--green-300)]"
              }
              ${disabled ? "opacity-60 cursor-not-allowed" : ""}
              ${className}
            `}
            {...rest}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-[var(--danger)]">{error}</p>
      )}
    </div>
  );
};

export default Input;