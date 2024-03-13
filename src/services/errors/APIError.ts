
type Severity = "I" | "S" | "E" | "W";

class APIError extends Error {
    statusCode: number;
    errorCode: number;
    severity: Severity;
    name: string;

    constructor(message: string, statusCode: number, name: string, errorCode: number, severity: Severity) {
        super(message);

        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = name;
        this.severity = severity;

        // Capture Stack Trace
        Error.captureStackTrace(this, this.constructor);

        // Ensure the correct prototype chain is maintained
        Object.setPrototypeOf(this, APIError.prototype)
    }
}

export default APIError;