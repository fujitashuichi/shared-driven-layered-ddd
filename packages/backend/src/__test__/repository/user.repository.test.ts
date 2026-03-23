import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UsersRepository } from "../../repository/index.js";
import { userMocks } from "../../__mock__/index.js";
import { SaveUserPayload } from "../../types/type.db.js";
import { prisma } from "../../lib/prisma.js";
import { cleanupDb } from "../tools/cleanupDb.js";


describe("user.repositoryの各メソッドを検査", () => {
  let repository: UsersRepository | null = null;

  beforeEach(async () => {
    repository = new UsersRepository();
    await cleanupDb();
  }, 50000);
  afterEach(async () => {
    repository = null;
    vi.resetAllMocks();
  })

  describe("正常型", () => {
    it("saveUserは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();

      const promise = repository!.saveUser(payload);
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toStrictEqual(expect.objectContaining(required));
    });

    it("getUsersは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();
      await repository!.saveUser(payload);

      const promise = repository!.getUsers();
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining(required)
        ])
      );
    });

    it("findByIdは正しく成功する", async () => {
      const payload: SaveUserPayload = userMocks.saveUserPayload();
      const user = await repository!.saveUser(payload);

      const promise = repository!.findById(user!.id);
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toEqual(
        expect.objectContaining(required)
      );
    });

    it("findByEmailは正しく成功する", async () => {
      const payload: SaveUserPayload = userMocks.saveUserPayload();
      await repository!.saveUser(payload);

      const promise = repository!.findByEmail(payload.email);
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toEqual(
        expect.objectContaining(required)
      );
    });
  });

  describe("異常型", () => {
    it("userが存在しないときは、[]をresolveする", async () => {
      await prisma.user.deleteMany();

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
