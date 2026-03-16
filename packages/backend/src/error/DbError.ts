import { ResponseError } from "./ResponseError.js";

class DatabaseError extends ResponseError {
  constructor(database: string, table: string, operation: string) {
    super(`Failed to ${operation} ${table} from ${database}`, "InternalServerError")
  }
}

export class DatabaseGetError extends DatabaseError {
  constructor(database: string, table: string) {
    super(database, table, "get");
  }
}

export class DatabaseDeleteError extends DatabaseError {
  constructor(database: string, table: string) {
    super(database, table, "delete");
  }
}
