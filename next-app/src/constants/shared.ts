import * as z from "zod";

// These constants are available to both server and browser
// because they are prefixed with "NEXT_PUBLIC_"

const envVars = z.object({
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]),
}).parse(process.env);

export const sharedConstants = {
  NEXT_PUBLIC_APP_ENV: envVars.NEXT_PUBLIC_APP_ENV,
};