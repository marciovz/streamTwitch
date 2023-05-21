import { z } from "zod";

const { CLIENT_ID } = process.env;
const { TWITCH_ENDPOINT_AUTHORIZATION } = process.env;
const { TWITCH_ENDPOINT_REVOCATION } = process.env;

const envSchema = z.object({
  CLIENT_ID: z.string(),
  TWITCH_ENDPOINT_AUTHORIZATION: z.string(), 
  TWITCH_ENDPOINT_REVOCATION: z.string(),
});

const envs = {
  CLIENT_ID,
  TWITCH_ENDPOINT_AUTHORIZATION,
  TWITCH_ENDPOINT_REVOCATION,
}

const _env = envSchema.safeParse(envs);

if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
