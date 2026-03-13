export class SecurityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SecurityError";
  }
}

export class InvalidCharacterDetectedError extends SecurityError {
  constructor() {
    super("Security: InvalidCharacterDetected");
    this.name = "InvalidCharacterDetectedError";
  }
}

export class InvalidRequestDataError extends SecurityError {
  constructor() {
    super("Security: InvalidRequestData");
    this.name = "InvalidRequestDataError";
  }
}
