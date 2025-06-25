import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  fullWidth = false,
  icon,
  className = "",
  ...props
}: InputProps) {
  const id = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[#c9d1d9] mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`
            block ${fullWidth ? "w-full" : "w-auto"} px-4 py-2 
            bg-[#0D1117] text-[#c9d1d9] 
            border ${error ? "border-red-500" : "border-[#30363d]"} 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${icon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
