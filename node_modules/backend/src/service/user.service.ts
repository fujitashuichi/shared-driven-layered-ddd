import { Database } from "sqlite3";
import { UsersRepository } from "../repository/index.js";
import { createAppDb } from "../db/index.js";
import { User } from "../types/index.js";

const appDb = await createAppDb("app.db");

export class UserService {
  private readonly repository: UsersRepository;

  constructor(db: Database = appDb) {
    this.repository = new UsersRepository(db);
  }

  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }

  findByEmail = async (email: User["email"]) => {
    return await this.repository.findByEmail(email);
  }
}