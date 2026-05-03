"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import {
  OAUTH_PROVIDER_LABELS,
  type OAuthProvider,
} from "./oauth.constants";

const getProvider = (value: string | null): OAuthProvider => {
  if (value === "github" || value === "linkedin" || value === "google") {
    return value;
  }

  return "google";
};

const OAuthSuccessPage = () => {
  const searchParams = useSearchParams();

  const provider = useMemo(
    () => getProvider(searchParams.get("provider")),
    [searchParams],
  );
  const firstTime = searchParams.get("firstTime") !== "false";

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-content">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_34%),radial-gradient(circle_at_85%_20%,_rgba(16,185,129,0.15),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)]" />
        <div className="absolute left-0 top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid w-full gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <aside className="rounded-[2rem] border border-white/70 bg-primary p-8 text-white shadow-[0_30px_90px_rgba(37,99,235,0.25)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/95">
                <BadgeCheck size={14} aria-hidden="true" />
                Session ready
              </div>

              <Heading level="h2" className="mt-6 font-semibold leading-tight text-white">
                Welcome to TeamUp
              </Heading>

              <p className="mt-4 font-primary text-sm leading-7 text-white/80 sm:text-base">
                Your {OAUTH_PROVIDER_LABELS[provider]} account is now connected. You can use the
                dashboard, projects, and profile tools immediately.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Authentication completed",
                  firstTime ? "Profile details stored" : "Existing account recognized",
                  "Ready to continue",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                      <Sparkles size={16} aria-hidden="true" />
                    </span>
                    <span className="font-primary text-sm text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </aside>

            <main className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:p-10">
              <div className="flex items-center gap-3 text-primary">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                  <BadgeCheck size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-primary text-xs font-semibold uppercase tracking-[0.18em] text-content-light">
                    OAuth success
                  </p>
                  <Heading level="h4" className="mt-1 font-semibold text-content">
                    {firstTime ? "Your profile is ready" : "Welcome back, your account is connected"}
                  </Heading>
                </div>
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-gray-200 bg-[linear-gradient(135deg,_rgba(37,99,235,0.06),_rgba(16,185,129,0.04))] p-6">
                <p className="font-primary text-sm leading-7 text-content">
                  {firstTime
                    ? "We saved your role and university details. You are now one step away from the dashboard."
                    : "You already have an account with TeamUp. We matched your provider and prepared your session."}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                    <p className="font-primary text-xs font-semibold uppercase tracking-[0.14em] text-content-light">
                      Provider
                    </p>
                    <p className="mt-2 font-primary text-sm font-semibold text-content">
                      {OAUTH_PROVIDER_LABELS[provider]}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                    <p className="font-primary text-xs font-semibold uppercase tracking-[0.14em] text-content-light">
                      Status
                    </p>
                    <p className="mt-2 font-primary text-sm font-semibold text-content">
                      {firstTime ? "Profile completed" : "Session verified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-primary text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.26)] transition-all duration-200 hover:bg-primary-dark"
                >
                  Go to dashboard
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>

                <Link
                  href="/auth?mode=signin"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 font-primary text-sm font-semibold text-content transition-colors hover:border-primary hover:text-primary"
                >
                  Return to login
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccessPage;
