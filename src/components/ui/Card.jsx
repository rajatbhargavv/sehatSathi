import React from "react";

const Card = ({
  children,
  variant = "default",
  padding = "p-4",
  fullWidth = false,
  onClick,
  className = "",
  ...rest
}) => {
  let variantStyles = "";

  if (variant === "default") {
    variantStyles = "bg-white border border-[var(--border)]";
  } else if (variant === "elevated") {
    variantStyles = "bg-white shadow-md";
  } else if (variant === "interactive") {
    variantStyles =
      "bg-white border border-[var(--border)] hover:shadow-md cursor-pointer";
  } else if (variant === "hero") {
  variantStyles =
    "bg-gradient-to-br from-[var(--primary-dk)] to-[var(--primary)] text-white border-transparent";
  } else if (variant === "glass") {
  variantStyles =
    "bg-white/10 border border-white/20 backdrop-blur-sm text-white";
}

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl transition-all duration-200
        ${variantStyles}
        ${padding}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;