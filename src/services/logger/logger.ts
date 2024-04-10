import winston from "winston";

// logger levels
////////////////
// severity of all levels is assumed to be numerically ascending from most important to least important.
// levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
// };

const levels = {
    error: "error",
    warn: "warn",
    info: "info",
    http: "http",
    verbose: "verbose",
    debug: "debug",
    silly: "silly"
};

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.label(),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()),
    defaultMeta: { service: 'user-service' },
    transports: [
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `.log`
        new winston.transports.Console(),
        new winston.transports.File({ filename: '/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/logs/.log' })
    ],
});

export { levels };
export default logger;