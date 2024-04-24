import { fileURLToPath } from "url";
import path from "path";

// Anything from process.env is inferred as "string | undefined" type by TypeScript
// Which cannot be assigned to a "string" type (The TS2322 Error)
// The following functions ensure that process.env is always "string"
// Thus, eliminating explicitly checking for undefined each time
function getEnvOrThrow(env_variable: string): string | number {
  const env_value = process.env[env_variable];
  if (env_value) {
    return env_value;
  } else {
    throw new Error(
      `ERROR: ${env_variable} is not defined.\n Possible fix: Add ${env_variable} to your .env file`,
    );
  }
}

function getEnvOrDefault(env_variable: string, default_value: string): string {
  const env_value = process.env[env_variable];
  if (env_value) {
    return env_value;
  }
  return default_value;
}

type Config = {
  PORT: number | string;
  ENV: string;
  __dirname: string;
  base_url: string;
  DEBUG_MODE: boolean;
  SECRET: string;
};

const config: Config = {
  PORT: getEnvOrThrow("PORT"),
  SECRET: getEnvOrThrow("SECRET").toString(),
  DEBUG_MODE: getEnvOrDefault("DEBUG_MODE", "FALSE").toUpperCase() === "TRUE",
  ENV: getEnvOrDefault("NODE_ENV", "development"),
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  base_url: "http://localhost:3000/api",
};

export default config;
