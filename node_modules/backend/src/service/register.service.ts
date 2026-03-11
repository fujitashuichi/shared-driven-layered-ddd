import { hashPassword, signToken } from "../lib/index.js";
import { User } from "../types/type.db.js";
import { UsersRepository } from "../repository/index.js";
import { createAppDb } from "../db/app.db.js";
import { Database } from "sqlite3";
import { RegisterRequest } from "@pkg/shared";
import { EmailAlreadyRegisteredError } from "../error/UserAuthError.js";


const AppDb = await createAppDb("app.db");

export class RegisterService {
  private usersRepository: UsersRepository;

  constructor(db: Database = AppDb) {
    this.usersRepository = new UsersRepository(db);
  }

  registerUser = async (dto: RegisterRequest): Promise<{ user: User, token: string }> => {
    if (await this.usersRepository.findByEmail(dto.email) !== null) {
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const password_hash = await hashPassword(dto.password);

    const newUser = {
      email: dto.email,
      password_hash: password_hash,
      created_at: Date.now()
    }

    const savedUser: User = await this.usersRepository.saveUser(newUser);
    const token: string = signToken({ email: dto.email });

    return {
      user: savedUser,
      token: token
    };
  }
}
