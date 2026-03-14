import { Database } from "sqlite3";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProjectsRepository, UsersRepository } from "../../repository/index.js";
import { createAppDb } from "../../db/index.js";
import { userMocks } from "../../__mock__/index.js";
import { ProjectWithoutId, UpdateProjectPayload } from "../../types/index.js";

describe("project.repositoryの各メソッドを検査", () => {
  let db: Database | null = null;
  let usersRepository: UsersRepository | null = null;
  let projectsRepository: ProjectsRepository | null = null;

  beforeEach(async () => {
    db = await createAppDb(":memory:");
    usersRepository = new UsersRepository(db);
    projectsRepository = new ProjectsRepository(db);
    console.info("beforeEach run");
  });
  afterEach(async () => {
    db = null;
    usersRepository = null;
    projectsRepository = null;
    console.info("afterEach run");
  })

  it("正常にプロジェクトを保存できる", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data: ProjectWithoutId = { userId: user.id, title: "Title", createdAt: 1, updatedAt: 1 }
    const promise = projectsRepository!.saveProject(data);

    await expect(promise).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  it ("ユーザーに紐づかないプロジェクトは保存できない(SQL_CONSTRAINT)", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data: ProjectWithoutId = { userId: user.id + 1, title: "Title", createdAt: 1, updatedAt: 1 };
    const promise = projectsRepository!.saveProject(data);

    await expect(promise).rejects.toThrow();
  });

  it ("getProjectsは正しく成功する", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data_1: ProjectWithoutId = { userId: user.id, title: "Title_1", createdAt: 1, updatedAt: 1 };
    const data_2: ProjectWithoutId = { userId: user.id, title: "Title_2", createdAt: 2, updatedAt: 2 };
    await projectsRepository!.saveProject(data_1);
    await projectsRepository!.saveProject(data_2);

    const result = await projectsRepository!.getProjects();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data_1),
        expect.objectContaining(data_2)
      ])
    );
  });

  it ("updateProjectは正しく成功する", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data_1: ProjectWithoutId = { userId: user.id, title: "Title_1", createdAt: 1, updatedAt: 1 };
    await projectsRepository!.saveProject(data_1);

    const data_update: UpdateProjectPayload = { title: "newTitle", status: "newStatus", updatedAt: Date.now() };
    const result = await projectsRepository!.updateProject(data_update, 1);

    expect(result).toEqual(
      expect.objectContaining(data_update)
    );
  });

  it ("findByIdは正しく成功する", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data: ProjectWithoutId = { userId: user.id, title: "Title_1", createdAt: 1, updatedAt: 1 };
    const saved = await projectsRepository!.saveProject(data);

    const result = await projectsRepository!.findById(saved.id);
    expect(result).toEqual(
      expect.objectContaining(data)
    );
  });

  it ("findByUserIdは正しく成功する", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data: ProjectWithoutId = { userId: user.id, title: "Title_1", createdAt: 1, updatedAt: 1 };
    const saved = await projectsRepository!.saveProject(data);

    const result = await projectsRepository!.findByUserId(saved.id);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data)
      ])
    );
  });

  it ("findByTitleは正しく成功する", async () => {
    const { id, ...reqBody } = userMocks.user();
    const user = await usersRepository!.saveUser(reqBody);

    const data: ProjectWithoutId = { userId: user.id, title: "Title_1", createdAt: 1, updatedAt: 1 };
    const saved = await projectsRepository!.saveProject(data);

    const result = await projectsRepository!.findByTitle(saved.title);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data)
      ])
    );
  });
});
