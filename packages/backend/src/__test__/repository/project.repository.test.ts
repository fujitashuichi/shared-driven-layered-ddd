import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProjectsRepository, UsersRepository } from "../../repository/index.js";
import { projectPayloadMock, userMocks } from "../../__mock__/index.js";
import { SaveProjectPayload } from "../../types/type.db.js";
import { prisma } from "../../lib/prisma.js";
import { PatchProjectRequest } from "@pkg/shared";


describe("project.repositoryの各メソッドを検査", () => {
  let usersRepository: UsersRepository | null = null;
  let projectsRepository: ProjectsRepository | null = null;

  beforeEach(async () => {
    usersRepository = new UsersRepository();
    projectsRepository = new ProjectsRepository();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
  });
  afterEach(async () => {
    usersRepository = null;
    projectsRepository = null;
  });

  it("正常にプロジェクトを保存できる", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload(user);
    const promise = projectsRepository!.saveProject(data);

    await expect(promise).resolves.toEqual(
      expect.objectContaining(data)
    );
  });

  it ("ユーザーに紐づかないプロジェクトは保存できない(SQL_CONSTRAINT)", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = { ...projectPayloadMock.SaveProjectPayload(user), userId: user.id + 1 };
    const promise = projectsRepository!.saveProject(data);

    await expect(promise).rejects.toThrow();
  });

  it ("updateProjectは正しく成功する", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload(user);
    const saved = await projectsRepository!.saveProject(data);

    const updatedData: PatchProjectRequest = { title: "title", description: null, status: "done" };
    const result = await projectsRepository!.updateProject(updatedData, saved.id);

    expect(result).toEqual(
      expect.objectContaining(updatedData)
    );
  });

  it("deleteProjectは正しく成功する", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload(user);
    const project = await projectsRepository!.saveProject(data);

    const promise = projectsRepository!.deleteProject(project.id);
    await expect(promise).resolves.toStrictEqual(expect.objectContaining(data));
  });

  it ("findByIdは正しく成功する", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload(user);
    const saved = await projectsRepository!.saveProject(data);

    const promise = projectsRepository!.findById(saved.id);
    await expect(promise).resolves.toStrictEqual(expect.objectContaining(data));
  });

  it ("findByUserIdは正しく成功する", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload(user);
    const saved = await projectsRepository!.saveProject(data);

    const result = await projectsRepository!.findByUserId(saved.userId);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data)
      ])
    );
  });

  it ("findByTitleは正しく成功する", async () => {
    const payload = userMocks.saveUserPayload();
    const user = await usersRepository!.saveUser(payload);

    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload(user);
    const saved = await projectsRepository!.saveProject(data);

    const result = await projectsRepository!.findByTitle(saved.title);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(data)
      ])
    );
  });
});
