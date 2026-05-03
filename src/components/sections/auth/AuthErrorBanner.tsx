"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";

interface AuthErrorBannerProps {
  message: string;
  variant?: "error" | "success";
  onClose?: () => void;
}

const AuthErrorBanner = ({
  message,
  variant = "error",
  onClose,
}: AuthErrorBannerProps) => {
  const isSuccess = variant === "success";

  return (
    <div
      role="alert"
      className={`w-full rounded-lg border bg-white px-4 py-3 shadow-[0_2px_12px_rgba(15,23,42,0.06)] ${
        isSuccess
          ? "border-[#16a34a] text-[#16a34a]"
          : "border-[#ff6b6b] text-[#ff6b6b]"
      }`}
    >
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <CheckCircle2
            size={18}
            className="flex-shrink-0 text-[#16a34a]"
          />
        ) : (
          <AlertCircle size={18} className="flex-shrink-0 text-[#ff6b6b]" />
        )}
        <p className="flex-1 font-primary text-sm font-medium leading-snug">
          {message}
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss error"
            className={`flex-shrink-0 transition-opacity duration-150 hover:opacity-70 ${
              isSuccess ? "text-[#16a34a]" : "text-[#ff6b6b]"
            }`}
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthErrorBanner;