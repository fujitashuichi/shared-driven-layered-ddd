export class ProjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProjectError";
  }
}

export class DuplicateProjectError extends ProjectError {
  constructor() {
    super("Cannot create Project because same ProjectName found");
    this.name = "ProjectAlreadyCreatedError";
  }
}

export class ProjectUndefinedError extends ProjectError {
  constructor() {
    super("Project undefined");
    this.name = "ProjectUndefinedError";
  }
}
