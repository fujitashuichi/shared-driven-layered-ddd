vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock, projectRequestMocks, userMocks } from "../../__mock__/index.js";
import { NextFunction, Request, Response } from "express";
import { createProject, register } from "../../controller/index.js";
import { authorize } from "../../middleware/index.js";
import { isUsersProject } from "../../middleware/isUsersProject.js";
import { ProjectUndefinedError } from "../../error/ProjectError.js";
import { prisma } from "../../lib/prisma.js";
import { PostProjectRequest } from "@pkg/shared";
import { RegisterService } from "../../service/register.service.js";


describe("isUsersProject", () => {
  let res: Response | null = null;
  let next: NextFunction | null = null;


  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
  }, 50000);
  afterEach(() => {
    res = null;
    next = null;
  });

  it("ユーザーが所持するprojectであれば次へ進む", async () => {
    const service = new RegisterService();

    const userData = await service.registerUser({ email: "example@email.com", password: "password" });

    const cookies: Request["cookies"] = { token: userData.token };

    const body: PostProjectRequest = projectRequestMocks.postProject.validReq_1().body;
    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    createProject()(createRequestMock.withBody({ body }), res!);

    const req = createRequestMock.withParams({ id: userData.user.id });
    await isUsersProject()(req, res!, next!);

    expect(next).toHaveBeenCalledWith();
  });

  it("ユーザーが所持していないprojectに対して、ErrorHandlerを呼ぶ", async () => {
    await register()(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    createProject()(createRequestMock.withBody({ title: "Title" }), res!);

    const req = createRequestMock.withParams({ id: "5656564" });
    await isUsersProject()(req, res!, next!);

    expect(next).toHaveBeenCalledWith(expect.any(ProjectUndefinedError));
  });
});
