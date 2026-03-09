"use client";

import { useEffect } from "react";
import { initLenis, initAnchorScrolling, destroyLenis } from "@/lib/lenis";
import { initAOS } from "@/lib/aos";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  useEffect(() => {
    initAOS();
    initLenis();
    const cleanupAnchors = initAnchorScrolling();

    return () => {
      cleanupAnchors();
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
};

export default AppProvider;