"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib";
import { initAOS } from "@/lib";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  useEffect(() => {
    initAOS();
    initLenis();

    return () => {
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
};

export default AppProvider;