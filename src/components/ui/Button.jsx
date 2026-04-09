import React from "react";

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  type = "button",
  className = "",
  ...rest
}) => {
  let variantStyles = "";

  if (variant === "primary") {
    variantStyles =
      "bg-[var(--primary)] text-white hover:bg-[var(--primary-dk)]";
  } else if (variant === "secondary") {
    variantStyles =
      "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--green-50)]";
  } else if (variant === "danger") {
    variantStyles =
      "bg-[var(--danger)] text-white hover:bg-red-700";
  } else if (variant === "family") {
    variantStyles =
      "bg-[var(--family)] text-white hover:bg-[var(--family-dk)]";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl font-medium transition-all duration-200
        px-4 py-2 text-sm
        ${variantStyles}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;