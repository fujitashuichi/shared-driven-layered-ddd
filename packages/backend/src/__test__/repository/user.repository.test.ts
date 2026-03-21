vi.stubEnv("DATABASE_URL", "file:./database.sqlite");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UsersRepository } from "../../repository/index.js";
import { createAppDb } from "../../db/app.db.js";
import { Database } from "sqlite3";
import { userMocks } from "../../__mock__/index.js";


describe("user.repositoryの各メソッドを検査", () => {
  let db: Database | null = null;
  let repository: UsersRepository | null = null;

  beforeEach(async () => {
    db = await createAppDb(":memory:");
    repository = new UsersRepository();
  });
  afterEach(async () => {
    db = null;
    repository = null;
  })

  describe("正常型", () => {
    it("saveUserは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();

      const promise = repository!.saveUser(payload);
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toEqual(
        expect.objectContaining(required)
      );
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
      const payload = userMocks.saveUserPayload();
      const user = await repository!.saveUser(payload);

      const promise = repository!.findById(user.id);
      const { passwordHash, ...required } = payload;
      await expect(promise).resolves.toEqual(
        expect.objectContaining(required)
      );
    });

    it("findByEmailは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();
      const user = await repository!.saveUser(payload);

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
