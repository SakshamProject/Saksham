type Severity = "I" | "S" | "E" | "W"; // I - informational, S - severe, E - error, W - warning

class APIError extends Error {
  statusCode: number;
  severity: Severity;
  name: string;

  constructor(
    message: string,
    statusCode: number,
    name: string,
    severity: Severity,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.name = name;
    this.severity = severity;

    // Capture Stack Trace
    Error.captureStackTrace(this, this.constructor);

    // Ensure the correct prototype chain is maintained
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError;
