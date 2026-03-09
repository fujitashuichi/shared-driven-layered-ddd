import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "../../repository/index.js";
import { createAppDb } from "../../db/app.db.js";
import { Database } from "sqlite3";
import { userMocks } from "../../__mock__/index.js";

describe("user.repositoryの各メソッドを検査", () => {
  let db: Database | null = null;
  let repository: UsersRepository | null = null;

  beforeEach(async () => {
    db = await createAppDb(":memory:");
    repository = new UsersRepository(db);
  });
  afterEach(async () => {
    db = null;
    repository = null;
  })

  it("saveUserは正しく成功する", async () => {
    const { id, ...data } = userMocks.user();
    const promise = repository?.saveUser(data);

    await expect(promise).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  it("getUsersは正しく成功する", async () => {
    const { id, ...data } = userMocks.user();
    await repository?.saveUser(data);

    const result = repository?.getUsers();

    await expect(result).resolves.toContainEqual(
      expect.objectContaining(data)
    );
  });

  it("findByIdは正しく成功する", async () => {
    const { id, ...data } = userMocks.user();
    await repository?.saveUser(data);

    const result = repository?.findById(1);
    await expect(result).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  it("findByEmailは正しく成功する", async () => {
    const { id, ...data } = userMocks.user();
    await repository?.saveUser(data);

    const result = repository?.findByEmail(data.email);
    await expect(result).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  it("userが存在しないときは、[]をresolveする", async () => {
    const result = repository?.getUsers();
    await expect(result).resolves.toStrictEqual([]);
  });

  it("合致するidがないときは、nullをresolveする", async () => {
    const result = repository?.findById(1);
    await expect(result).resolves.toStrictEqual(null);
  });

  it("合致するemailがないときは、nullをresolveする", async () => {
    const result = repository?.findByEmail("thisIsEmail@email.email");
    await expect(result).resolves.toStrictEqual(null);
  })
});
