import { SaveUserPayload } from "../types/type.db.js";
import { User } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { User as AppUser } from "@pkg/shared";

export class UsersRepository {
  private readonly select = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
  }

  getUsers = async (): Promise<AppUser[] | []> => {
    return await prisma.user.findMany({ select: this.select });
  }

  saveUser = async (data: SaveUserPayload): Promise<AppUser> => {
    return await prisma.user.create({ data, select: this.select });
  }

  findById = async (id: User["id"]): Promise<AppUser | null> => {
    return await prisma.user.findUnique({ where: { id }, select: this.select });
  }

  findByEmail = async (email: User["email"]): Promise<AppUser | null> => {
    return await prisma.user.findUnique({ where: { email }, select: this.select });
  }


  // 認証用には passwordHash を含める
  findByEmailForAuthOnly = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
  }
}
