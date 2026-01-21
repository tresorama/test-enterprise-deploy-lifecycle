import * as z from "zod";

const envVarsSchema = z.object({
  RUNTIME_APP_ENV: z.enum(["development", "staging", "production"]),
});

export function getServerConstants() {
  const envVars = envVarsSchema.parse(process.env);

  return {
    RUNTIME_APP_ENV: envVars.RUNTIME_APP_ENV,
  };
}