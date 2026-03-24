import { styleText } from "node:util";
import { Prisma } from "../../generated/prisma/client.js";

export const safeQuery = async <T>(query: () => Promise<T>): Promise<T | null> => {
  try {
    return await query();
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(styleText(
        ["bgRed", "white", "bold"],
        `>>> PrismaClientKnownRequestError\
        \n code: ${e.code}\
        \n message : ${e.message}`
      ));
      throw e;
    }
    if (e instanceof Prisma.PrismaClientValidationError) {
      console.error(styleText(
        ["bgRed", "white", "bold"],
        `>>> PrismaClientValidationError
        message : ${e.message}`
      ));
      throw e;
    }
    if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error(styleText(
        ["bgRed", "white", "bold"],
        `>>> PrismaClientUnknownRequestError
        message : ${e.message}`
      ));
      throw e;
    }
    if (e instanceof Prisma.PrismaClientInitializationError) {
      console.error(styleText(
        ["bgRed", "white", "bold"],
        `>>> PrismaClientInitializationError
        message : ${e.message}`
      ));
      throw e;
    }
    throw e;
  }
}
