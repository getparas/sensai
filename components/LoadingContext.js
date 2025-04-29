"use client";

import { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { Loader2 } from "lucide-react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading ? <LoadingSpinner /> : children}
    </LoadingContext.Provider>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-white" />
    </div>
  );
}
