export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}



export class UserUndefinedError extends UserError {
  constructor() {
    super("UserData undefined: searching User is not registered");
    this.name = "UserUndefinedError";
  }
}
