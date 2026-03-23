import { PrismaPg } from "@prisma/adapter-pg";
import { ENV } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/index.js";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: ENV.DATABASE_URL })
});
