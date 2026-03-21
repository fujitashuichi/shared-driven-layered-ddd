import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProjectsRepository, UsersRepository } from "../../repository/index.js";
import { projectPayloadMock, projectRequestMocks, userMocks } from "../../__mock__/index.js";
import { SaveProjectPayload, } from "../../types/index.js";
import { MockProxy, mockReset } from "vitest-mock-extended";
import { PrismaClient } from "../../generated/prisma/client.js";
import { prismaMock } from "../../__mock__/prismaMock.js";
import { PatchProjectRequest } from "@pkg/shared";


describe("project.repositoryの各メソッドを検査", () => {
  let usersRepository: UsersRepository | null = null;
  let projectsRepository: ProjectsRepository | null = null;
  let prisma: MockProxy<PrismaClient> | null = null;

  beforeEach(async () => {
    usersRepository = new UsersRepository();
    projectsRepository = new ProjectsRepository();
    prisma = prismaMock;
  });
  afterEach(async () => {
    usersRepository = null;
    projectsRepository = null;
    prisma = null;
    mockReset(prismaMock);
  });

  it("正常にプロジェクトを保存できる", async () => {
    const data: SaveProjectPayload = projectPayloadMock.SaveProjectPayload();
    await projectsRepository!.saveProject(data);

    expect(prisma!.project.create).toHaveBeenCalledWith(expect.anything());
  });

  it ("updateProjectは正しく成功する", async () => {
    const data_update: PatchProjectRequest = projectRequestMocks.postProject.validReq_1();
    await projectsRepository!.updateProject(data_update, 1);

    expect(prisma!.project.update).toHaveBeenCalledWith(expect.anything());
  });

  it("deleteProjectは正しく成功する", async () => {
    await projectsRepository!.deleteProject(1);

    expect(prisma!.project.delete).toHaveBeenCalledWith(expect.anything());
  });

  it ("findByIdは正しく成功する", async () => {
    await projectsRepository!.findById(1);

    expect(prisma!.project.findUnique).toHaveBeenCalledWith(expect.anything());
  });

  it ("findByUserIdは正しく成功する", async () => {
    await projectsRepository!.findByUserId("uuid");

    expect(prisma!.project.findMany).toHaveBeenCalledWith(expect.anything());
  });

  it ("findByTitleは正しく成功する", async () => {
    await projectsRepository!.findByUserId("title");

    expect(prisma!.project.findMany).toHaveBeenCalledWith(expect.anything());
  });
});
