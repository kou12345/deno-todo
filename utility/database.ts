import "https://deno.land/std@0.204.0/dotenv/load.ts";

import { type Config, createClient } from "https://esm.sh/@libsql/client@0.3.6";

const config = {
  url: Deno.env.get("TORSO_DB_URL"),
  authToken: Deno.env.get("TORSO_AUTH_TOKEN"),
} as Config;

export const db = createClient(config);
