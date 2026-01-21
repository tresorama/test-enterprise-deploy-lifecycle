'use client';

import { useAppRuntimeConfigContext } from "@/store/app-runtime-config/client";
import { Badge } from "@/components/ui/badge";

export function AppEnvIndicator() {
  const appRuntimeConfig = useAppRuntimeConfigContext();

  return (
    <Badge>
      <span className="mx-2 min-w-32">
        App Env:
        {" "}
        {
          appRuntimeConfig.status === 'success' ? appRuntimeConfig.data.env
            : appRuntimeConfig.status === 'error' ? 'error'
              : 'loading'
        }
      </span>
    </Badge>
  );
}