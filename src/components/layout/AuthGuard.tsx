"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { getStoredAuthToken } from "@/lib/axios";
import { useValidateToken } from "@/hooks/useAuth";
import type { UserRole } from "@/types/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackRedirect?: string;
  loadingLabel?: string;
}

const AuthGuard = ({
  children,
  requiredRoles,
  fallbackRedirect = "/auth?mode=signin",
  loadingLabel = "Checking your session...",
}: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const token = getStoredAuthToken();
  const { data, isPending, isError } = useValidateToken(true);

  useEffect(() => {
    if (!token) {
      router.replace(`${fallbackRedirect}&redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isError) {
      router.replace(fallbackRedirect);
      return;
    }

    if (data?.user && requiredRoles && !requiredRoles.includes(data.user.role)) {
      router.replace(fallbackRedirect);
    }
  }, [data?.user, fallbackRedirect, isError, pathname, requiredRoles, router, token]);

  const shouldBlock = !token || isPending || isError || !data?.valid;

  if (shouldBlock) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <LoaderCircle size={34} className="animate-spin text-primary" />
          <p className="font-primary text-sm text-content">{loadingLabel}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;