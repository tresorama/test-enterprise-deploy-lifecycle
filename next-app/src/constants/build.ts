import z from "zod";

const envVars = z.object({
  NEXT_PUBLIC_BUILD_APP_VERSION: z.string(),
}).parse(process.env);

export const buildConstants = {
  APP_VERSION: envVars.NEXT_PUBLIC_BUILD_APP_VERSION
};