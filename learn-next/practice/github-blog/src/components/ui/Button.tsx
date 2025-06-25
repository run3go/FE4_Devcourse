import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  const variantStyles = {
    primary: "bg-[#238636] hover:bg-[#2ea043] text-white focus:ring-green-500",
    secondary:
      "bg-[#21262D] hover:bg-[#30363d] text-white border border-[#30363d] focus:ring-gray-500",
    ghost:
      "bg-transparent hover:bg-[#21262D] text-[#c9d1d9] focus:ring-gray-500",
    danger: "bg-[#da3633] hover:bg-[#f85149] text-white focus:ring-red-500",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded",
    lg: "text-base px-6 py-3 rounded-md",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyles}
        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current\"
          xmlns="http://www.w3.org/2000/svg\"
          fill="none\"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25\"
            cx="12\"
            cy="12\"
            r="10\"
            stroke="currentColor\"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
