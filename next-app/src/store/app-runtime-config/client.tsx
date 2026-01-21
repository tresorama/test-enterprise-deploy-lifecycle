'use client';

import { createContext, useContext } from "react";

import { schemaAppRuntimeConfig, type AppRuntimeConfig } from "./types";
import { useAsync, type AsyncOutput } from "@/utils/react/use-async";

const appRuntimeConfigContext = createContext({} as AsyncOutput<AppRuntimeConfig>);

export function AppRuntimeConfigContextProviderClient({
  children
}: {
  children: React.ReactNode;
}) {

  const appRuntimeConfig = useAsync({
    fetchFn: async () => {
      const res = await fetch("/api/app-runtime-config");
      if (!res.ok) throw new Error('Cannot get app runtime config');
      const raw = await res.json();
      return schemaAppRuntimeConfig.parse(raw);
    }
  });

  return (
    <appRuntimeConfigContext.Provider value={appRuntimeConfig}>
      {children}
    </appRuntimeConfigContext.Provider>
  );
}

export const useAppRuntimeConfigContext = () => {
  const context = useContext(appRuntimeConfigContext);
  if (!context) {
    throw new Error(`useAppRuntimeConfigContext must be used within a AppRuntimeConfigContextProviderClient`);
  }
  return context;
};