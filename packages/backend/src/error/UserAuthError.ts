export class UserAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserAuthError";
  }
}

export class UnAuthorizedError extends UserAuthError {
  constructor() {
    super("User UnAuthorized: token was undefined or invalid");
    this.name = "UnAuthorizedError";
  }
}

// register
export class EmailAlreadyRegisteredError extends UserAuthError {
  constructor(email: string) {
    super(`Email already registered: ${email}`);
    this.name = "EmailAlreadyRegisteredError";
  }
}

export class InvalidPasswordError extends UserAuthError {
  constructor() {
    super("Invalid password");
    this.name = "InvalidPasswordError";
  }
}

// login
export class ConfirmPasswordError extends UserAuthError {
  constructor() {
    super("Login failed: password is wrong");
    this.name = "ConfirmPasswordError";
  }
}
