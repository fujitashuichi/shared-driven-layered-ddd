import { UsersRepository } from "../repository/index.js";
import { LoginRequest } from "@pkg/shared";
import { comparePassword, signToken } from "../lib/index.js";
import { UserUndefinedError } from "../error/index.js";
import { styleText } from "node:util";


export class LoginStateManagementService {
  private readonly usersRepository = new UsersRepository();


  login = async (dto: LoginRequest): Promise<{ token: string }> => {
    try {
      const user = await this.usersRepository.findByEmailForAuthOnly(dto.email);
      if (!user) {
        throw new UserUndefinedError();
      }

      await comparePassword(dto.password, user.passwordHash);

      const newToken = signToken({ email: dto.email });

      return {
        token: newToken
      };
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(styleText(
          ["red", "bgYellowBright"],
          `${e.name} caught\n in ${import.meta.filename}`
        ));
      }

      throw e;
    }
  }
}
