import { fileURLToPath } from "url";
import path from "path";

// Anything from process.env is inferred as "string | undefined" type by TypeScript
// Which cannot be assigned to a "string" type (The TS2322 Error)
// The following functions ensure that process.env is always "string"
// Thus, eliminating explicitly checking for undefined each time
function getEnvOrThrow(env_variable: string): string {
    const env_value = process.env[env_variable];
    if (env_value) {
        return env_value;
    } else {
        throw new Error(`ERROR: ${env_variable} is not defined.\n Possible fix: Add ${env_variable} to your .env file`);
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
    PORT: number,
    ENV : string,
    __dirname: string
}

const config: Config = {
    PORT: 3000,
    ENV: getEnvOrDefault("NODE_ENV", "development"),
    __dirname: path.dirname(fileURLToPath(import.meta.url))
}

export default config;