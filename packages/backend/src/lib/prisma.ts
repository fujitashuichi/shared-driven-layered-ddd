import { PrismaPg } from "@prisma/adapter-pg";
import { ENV } from "../config/env.js";
import { PrismaClient } from "@prisma/client/extension";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: ENV.DATABASE_URL })
});
