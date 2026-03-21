import { DeepMockProxy, mockDeep } from "vitest-mock-extended";
import { PrismaClient } from "../generated/prisma/client.js";

export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>
