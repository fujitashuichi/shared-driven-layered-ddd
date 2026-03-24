import { UsersRepository } from "../repository/index.js";
import { User } from "@pkg/shared";


export class UserService {
  private readonly repository = new UsersRepository();

  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }

  findByEmail = async (email: User["email"]) => {
    return await this.repository.findByEmail(email);
  }
}