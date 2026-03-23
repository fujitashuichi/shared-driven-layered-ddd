import { Prisma } from "../generated/prisma/client.js";

export const safeQuery = async <T>(query: () => Promise<T>): Promise<T | null> => {
  try {
    return await query();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`code: ${e.code}\n message : ${e.message}`);
      throw e;
    }
    if (e instanceof Prisma.PrismaClientValidationError) {
      console.error(`message : ${e.message}`);
      throw e;
    }
    if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error(`message : ${e.message}`);
      throw e;
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      console.error(`message : ${e.message}`);
      throw e;
    }
    throw e;
  }
}
