import React from "react";

const Select = ({
  options = [],
  value,
  onChange,
  label,
  error,
  disabled = false,
  placeholder = "Select option",
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full space-y-1">
      
      {/* LABEL */}
      {label && (
        <label className="text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      )}

      {/* SELECT */}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full rounded-xl bg-white text-sm
          px-3 py-2 outline-none transition
          border border-[var(--border)]
          focus:ring-2 focus:ring-[var(--green-300)]
          
          ${error ? "border-[var(--danger)] focus:ring-[var(--danger-lt)]" : ""}
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          ${className}
        `}
        {...rest}
      >
        {/* PLACEHOLDER */}
        <option value="" disabled>
          {placeholder}
        </option>

        {/* OPTIONS */}
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          } else {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </select>

      {/* ERROR */}
      {error && (
        <p className="text-xs text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;