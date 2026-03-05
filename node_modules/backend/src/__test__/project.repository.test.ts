import { Database } from "sqlite3";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProjectsRepository, UsersRepository } from "../repository/index.js";
import { createAppDb } from "../db/app.db.js";
import { userMocks } from "../__mock__/index.js";

describe("project.repositoryの各メソッドを検査", () => {
  let db: Database | null = null;
  let usersRepository: UsersRepository | null = null;
  let projectsRepository: ProjectsRepository | null = null;

  beforeEach(async () => {
    db = await createAppDb(":memory:");
    usersRepository = new UsersRepository(db);
    projectsRepository = new ProjectsRepository(db);
  });
  afterEach(async () => {
    db = null;
    usersRepository = null;
    projectsRepository = null;
  })

  it("正常にプロジェクトを保存できる", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data = { userId: user.id, title: "Title", createdAt: 1, updatedAt: 1 }
    const promise = projectsRepository!.saveProject(data);

    await expect(promise).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  it ("ユーザーに紐づかないプロジェクトは保存できない(SQL_CONSTRAINT)", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data = { userId: user.id + 1, title: "Title", createdAt: 1, updatedAt: 1 };
    const promise = projectsRepository!.saveProject(data);

    await expect(promise).rejects.toThrow();
  });
});
