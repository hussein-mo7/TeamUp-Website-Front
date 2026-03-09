import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  error?: string;
}

const Textarea = ({
  label,
  id,
  error,
  className = "",
  ...props
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-primary text-sm text-content font-medium"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full px-4 py-3 rounded-xl border text-sm font-primary text-content
          placeholder:text-content-muted resize-none transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/10
          ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-gray-200 focus:border-primary"
          }
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-primary">{error}</p>}
    </div>
  );
};

export default Textarea;
