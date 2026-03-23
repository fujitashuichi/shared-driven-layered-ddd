import { SaveUserPayload } from "../types/type.db.js";
import { User } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { User as AppUser } from "@pkg/shared";
import { safeQuery } from "./safeQuery.js";

export class UsersRepository {
  private readonly select = {
    id: true,
    email: true,
    createdAt: true,
  }

  getUsers = async (): Promise<AppUser[] | [] | null> => {
    return await safeQuery(() =>
      prisma.user.findMany({ select: this.select })
    );
  }

  saveUser = async (data: SaveUserPayload): Promise<AppUser | null> => {
    return await safeQuery(() =>
      prisma.user.create({ data, select: this.select })
    );
  }

  deleteUser = async (id: User["id"]): Promise<User | null> => {
    // Foreign_key制約によって、プロジェクトの削除が必須
    await safeQuery(() =>
      prisma.project.deleteMany()
    );
    return await safeQuery(() =>
      prisma.user.delete({ where: { id } })
    );
  }

  findById = async (id: User["id"]): Promise<AppUser | null> => {
    return await safeQuery(() =>
      prisma.user.findUnique({ where: { id }, select: this.select })
    );
  }

  findByEmail = async (email: User["email"]): Promise<AppUser | null> => {
    return await safeQuery(() =>
      prisma.user.findUnique({ where: { email }, select: this.select })
    );
  }


  // 認証用には passwordHash を含める
  findByEmailForAuthOnly = async (email: string): Promise<User | null> => {
    return await safeQuery(() =>
      prisma.user.findUnique({ where: { email } })
    );
  }
}
