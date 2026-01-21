import { getServerConstants } from "@/constants/server";
import type { AppRuntimeConfig } from "./types";

export const handleGetRequest = () => {

  const serverConstants = getServerConstants();
  const appRuntimeConfig: AppRuntimeConfig = {
    env: serverConstants.RUNTIME_APP_ENV,
  };

  return Response.json(
    appRuntimeConfig,
    { status: 200 }
  );
}

