import { hashPassword, signToken } from "../lib/index.js";
import { UsersRepository } from "../repository/index.js";
import { Database } from "sqlite3";
import { RegisterRequest, User, UserSchema } from "@pkg/shared";
import { EmailAlreadyRegisteredError } from "../error/index.js";


export class RegisterService {
  private usersRepository = new UsersRepository();


  registerUser = async (dto: RegisterRequest): Promise<{ user: User, token: string }> => {
    if (await this.usersRepository.findByEmail(dto.email) !== null) {
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const hashed = await hashPassword(dto.password);

    const newUser = {
      email: dto.email,
      passwordHash: hashed,
      createdAt: new Date()
    }

    const savedUser: User = await this.usersRepository.saveUser(newUser);
    const token: string = signToken({ email: dto.email });

    return {
      user: savedUser,
      token: token
    };
  }
}
