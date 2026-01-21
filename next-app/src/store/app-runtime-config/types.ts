import z from "zod";

export const schemaAppRuntimeConfig = z.object({
  env: z.enum(['development', 'staging', 'production']),
});

export type AppRuntimeConfig = z.infer<typeof schemaAppRuntimeConfig>;
