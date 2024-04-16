import winston from "winston";
import path from "path";
import config from "../../../config.js";

// logger levels
////////////////
// severity of all levels is assumed to be numerically ascending from most important to least important.
////////////////
const levels = {
    error: "error", // 0
    warn: "warn", // 1
    info: "info", // 2
    http: "http", // 3
    verbose: "verbose", // 4
    debug: "debug", // 5
    silly: "silly" // 6
};

const date = new Date();
const newFilename = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ".log";

const formats = {
    file: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.json()),
    console:winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.json(),
        winston.format.prettyPrint({colorize: true, depth: 4}))
}
const logger = winston.createLogger({
    // defaultMeta: { service: 'user-service' },
    transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `.log`
        new winston.transports.Console({
            format: formats.console
        }),
        new winston.transports.File({ filename: path.join(config.__dirname,'logs',`${newFilename}-errors.log`), level: 'error',
         format: formats.file
        }),
        new winston.transports.File({ filename: path.join(config.__dirname,'logs', `${newFilename}-combined.log`), format: formats.file })
    ],
});

function log(level: string, message: string, ...args: any[]) {
    if (config.DEBUG_MODE) {
        logger.log(level, message, ...args);
    }
}

export { levels };
export default log;