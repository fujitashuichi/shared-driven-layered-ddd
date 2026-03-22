import { prisma } from "../lib/prisma.js";


export const createTestUser = async () => {
  return await prisma.user.create({
    data: { email: `test-${Date.now()}@example.com`, passwordHash: 'password' }
  });
}
