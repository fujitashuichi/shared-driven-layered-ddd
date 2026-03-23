import { expect } from "vitest";
import { prisma } from "../../lib/prisma.js";

// DBを介するテストで必須
// beforeEach内で使用する

export const cleanupDb = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));

  const count = await prisma.user.count();

  console.log(`[START] ${expect.getState().currentTestName}`);

  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log(`[CLEANED] User count: ${count}`);
}
