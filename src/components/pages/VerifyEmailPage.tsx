"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, MailX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/hooks/useAuth";
import { Heading } from "@/components/ui/typography";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (!token || verifyEmailMutation.isPending || verifyEmailMutation.isSuccess) {
      return;
    }

    verifyEmailMutation.mutate({ token });
  }, [token, verifyEmailMutation]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <MailX size={44} className="mx-auto text-red-500" />
          <Heading level="h3" className="mt-4 text-primary font-semibold">
            Missing verification token
          </Heading>
          <p className="mt-3 text-sm text-content font-primary leading-relaxed">
            This page needs the token from your email verification link.
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

  if (verifyEmailMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <LoaderCircle size={44} className="mx-auto animate-spin text-primary" />
          <Heading level="h3" className="mt-4 text-primary font-semibold">
            Verifying your email
          </Heading>
          <p className="mt-3 text-sm text-content font-primary leading-relaxed">
            Please wait while we confirm your account.
          </p>
        </div>
      </div>
    );
  }

  if (verifyEmailMutation.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <MailX size={44} className="mx-auto text-red-500" />
          <Heading level="h3" className="mt-4 text-primary font-semibold">
            Verification failed
          </Heading>
          <p className="mt-3 text-sm text-content font-primary leading-relaxed">
            {verifyEmailMutation.error instanceof Error
              ? verifyEmailMutation.error.message
              : "We could not verify this email link."}
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

  if (verifyEmailMutation.isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <CheckCircle2 size={44} className="mx-auto text-green-600" />
          <Heading level="h3" className="mt-4 text-primary font-semibold">
            Email verified
          </Heading>
          <p className="mt-3 text-sm text-content font-primary leading-relaxed">
            Your account is now verified. You can sign in and continue.
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

  return null;
};

export default VerifyEmailPage;