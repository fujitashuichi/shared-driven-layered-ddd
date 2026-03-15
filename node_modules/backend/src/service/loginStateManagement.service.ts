import { Database } from "sqlite3";
import { createAppDb } from "../db/index.js";
import { UsersRepository } from "../repository/index.js";
import { LoginRequest } from "@pkg/shared";
import { comparePassword, signToken } from "../lib/index.js";
import { UserUndefinedError } from "../error/index.js";


const appDb = await createAppDb("app.db");

export class LoginStateManagementService {
  private readonly usersRepository: UsersRepository;

  constructor(db: Database = appDb) {
    this.usersRepository = new UsersRepository(db);
  }

  tryLogin = async (dto: LoginRequest): Promise<{ token: string }> => {
    const user = await this.usersRepository.findByEmailForAuthOnly(dto.email);
    if (!user) {
      throw new UserUndefinedError();
    }

    await comparePassword(dto.password, user.passwordHash);

    const newToken = signToken({ email: dto.email });

    return {
      token: newToken
    };
  }
}
