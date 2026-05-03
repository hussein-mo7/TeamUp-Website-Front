"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MailX } from "lucide-react";
import { ResetPasswordStep } from "@/components/sections/auth/forgotPassword";
import { useResetPassword } from "@/hooks/useAuth";
import { Heading } from "@/components/ui/typography";
import { getApiErrorMessage } from "@/lib/apiError";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const resetPasswordMutation = useResetPassword();
  const [isDone, setIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = async (newPassword: string, confirmPassword: string) => {
    if (!token) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword,
      });

      setIsDone(true);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Failed to reset password."));
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <MailX size={44} className="mx-auto text-red-500" />
          <Heading level="h3" className="mt-4 text-primary font-semibold">
            Missing reset token
          </Heading>
          <p className="mt-3 text-sm text-content font-primary leading-relaxed">
            Open the password reset link from your email to continue.
          </p>
          <Link
            href="/auth?mode=signin"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  if (isDone || resetPasswordMutation.isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <CheckCircle2 size={44} className="mx-auto text-green-600" />
          <Heading level="h3" className="mt-4 text-primary font-semibold">
            Password updated
          </Heading>
          <p className="mt-3 text-sm text-content font-primary leading-relaxed">
            Your password has been changed successfully. You can now sign in.
          </p>
          <Link
            href="/auth?mode=signin"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <ResetPasswordStep
          onReset={handleReset}
          onBack={() => window.history.back()}
          isLoading={resetPasswordMutation.isPending}
        />

        {resetPasswordMutation.isError && (
          <p className="mt-4 text-sm text-red-500 font-primary">
            {errorMessage || "Failed to reset password."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;