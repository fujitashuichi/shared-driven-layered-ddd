import bcrypt from "bcrypt"
import { InvalidPasswordError } from "../error/index.js";
import { RegisterRequest } from "@pkg/shared";

const SaltRounds = 10;

export const hashPassword = async (password: RegisterRequest["password"]) => {
  return await bcrypt.hash(password, SaltRounds);
}


export const comparePassword = async (password: string, hashedPassword: string): Promise<true> => {
  const isValid = await bcrypt.compare(password, hashedPassword);

  if (isValid) {
    return true
  } else {
    throw new InvalidPasswordError();
  }
}
