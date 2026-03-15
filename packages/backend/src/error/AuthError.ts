export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserAuthError";
  }
}

export class UnAuthorizedError extends AuthError {
  constructor() {
    super("User UnAuthorized: token was undefined or invalid");
    this.name = "UnAuthorizedError";
  }
}

// register
export class EmailAlreadyRegisteredError extends AuthError {
  constructor(email: string) {
    super(`Email already registered: ${email}`);
    this.name = "EmailAlreadyRegisteredError";
  }
}

export class InvalidPasswordError extends AuthError {
  constructor() {
    super("Invalid password");
    this.name = "InvalidPasswordError";
  }
}

// login
export class ConfirmPasswordError extends AuthError {
  constructor() {
    super("Login failed: password is wrong");
    this.name = "ConfirmPasswordError";
  }
}
