"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncOAuthSession } from "@/lib/oauth";

const OAuthSuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const prepareSession = async () => {
      const token = await syncOAuthSession();

      if (!isMounted) {
        return;
      }

      if (!token) {
        router.replace("/auth?mode=signin");
        return;
      }

      router.replace("/dashboard");
    };

    void prepareSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-content" />
  );
};

export default OAuthSuccessPage;
