import { hashPassword, signToken } from "../lib/index.js";
import { UsersRepository } from "../repository/index.js";
import { RegisterRequest, User } from "@pkg/shared";
import { EmailAlreadyRegisteredError, UserUndefinedError } from "../error/index.js";


export class RegisterService {
  private usersRepository = new UsersRepository();


  registerUser = async (dto: RegisterRequest): Promise<{ user: User, token: string }> => {
    if (await this.usersRepository.findByEmail(dto.email) !== null) {
      console.error(`${dto.email}: already registered`);
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const hashed = await hashPassword(dto.password);

    const newUser = {
      email: dto.email,
      passwordHash: hashed,
      createdAt: new Date()
    }

    const savedUser: User | null = await this.usersRepository.saveUser(newUser);
    if (!savedUser) throw new UserUndefinedError();

    const token: string = signToken({ email: dto.email });

    return {
      user: savedUser,
      token: token
    };
  }
}
