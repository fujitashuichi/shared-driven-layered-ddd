import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UsersRepository } from "../../repository/index.js";
import { userMocks } from "../../__mock__/index.js";
import { MockProxy, mockReset } from "vitest-mock-extended"
import { PrismaClient } from "../../generated/prisma/client.js";
import { prismaMock } from "../../__mock__/prismaMock.js";


describe("user.repositoryの各メソッドを検査", () => {
  let repository: UsersRepository | null = null;
  let prisma: MockProxy<PrismaClient> | null = null;

  beforeEach(async () => {
    repository = new UsersRepository();
    prisma = prismaMock;
  });
  afterEach(async () => {
    repository = null;
    vi.resetAllMocks();
    mockReset(prisma);
  })

  describe("正常型", () => {
    it("saveUserは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();

      await repository!.saveUser(payload);
      expect(prisma!.project.create).toHaveBeenCalledWith(payload);
    });

    it("getUsersは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();
      await repository!.saveUser(payload);

      await repository!.getUsers();
      expect(prisma!.user.findMany).toHaveBeenCalled();
    });

    it("findByIdは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();
      const user = await repository!.saveUser(payload);

      await repository!.findById("uuid");
      expect(prisma!.user.findUnique).toHaveBeenCalledWith(expect.anything());
    });

    it("findByEmailは正しく成功する", async () => {
      const promise = repository!.findByEmail(payload.email);
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toEqual(
        expect.objectContaining(required)
      );
    });
  });

  describe("異常型", () => {
    it("userが存在しないときは、[]をresolveする", async () => {
      const result = repository!.getUsers();
      await expect(result).resolves.toStrictEqual([]);
    });

    it("合致するidがないときは、nullをresolveする", async () => {
      const result = repository!.findById("uuid");
      await expect(result).resolves.toStrictEqual(null);
    });

    it("合致するemailがないときは、nullをresolveする", async () => {
      const result = repository!.findByEmail("thisIsEmail@email.email");
      await expect(result).resolves.toStrictEqual(null);
    })
  });
});
