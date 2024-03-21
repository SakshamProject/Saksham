type Severity = "I" | "S" | "E" | "W"; // I - informational, S - severe, E - error, W - warning

class APIError extends Error {
  statusCode: number;
  errorCode: number;
  severity: Severity;
  name: string;
  additionalInfo: string;

  constructor(
    message: string,
    statusCode: number,
    name: string,
    errorCode: number,
    severity: Severity,
    additionalInfo: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.name = name;
    this.severity = severity;
    this.additionalInfo = additionalInfo;

    // Capture Stack Trace
    Error.captureStackTrace(this, this.constructor);

    // Ensure the correct prototype chain is maintained
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError;