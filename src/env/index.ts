import { z } from "zod";

const envSchema = z.object({
  CLIENT_ID: z.string(),
  TWITCH_ENDPOINT_AUTHORIZATION: z.string(), 
  TWITCH_ENDPOINT_REVOCATION: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;