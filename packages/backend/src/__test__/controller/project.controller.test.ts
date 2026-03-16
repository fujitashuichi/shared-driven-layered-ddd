vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock } from "../../__mock__/index.js";
import { Database } from "sqlite3";
import { NextFunction, Request, Response } from "express";
import { createAppDb } from "../../db/index.js";
import { createProject, getProjects, register } from "../../controller/index.js";
import { PostProjectRequest } from "@pkg/shared";
import { authorize } from "../../middleware/index.js";
import { mockReq } from "sinon-express-mock";
import { isUsersProject } from "../../middleware/isUsersProject.js";
import { deleteProject, updateProject } from "../../controller/project.controller.js";

describe("project.controller", () => {
  let res: Response | null;
  let next: NextFunction | null;
  let db: Database | null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    db = await createAppDb(":memory:");
    res = createResponseMock();
  });
  afterEach(() => {
    res = null;
    next = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("createProject: 正常に作成が完了する", async () => {
    await register(db!)(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);

    await createProject(db!)(mockReq({ body: { title: "Title" }, cookies: cookies }), res!);

    expect(res!.status).toHaveBeenCalledWith(201);
  });

  it("getProjects: 正常に成功する", async () => {
    await register(db!)(authRequestMocks.register.validReq(), res!);

    const body: PostProjectRequest = { title: "Title" };

    // 保存されたcookieを取得
    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    // authorizeして、Project作成
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await createProject(db!)(mockReq({ body: body, cookies: cookies }), res!);

    // authorizeして、getProjectを実行
    res = createResponseMock();
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await getProjects(db!)(createRequestMock.withoutData(), res!);

    expect(res!.status).toHaveBeenCalledWith(200);
    expect(res!.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.arrayContaining([ expect.objectContaining(body) ])
      })
    );
  });

  it("updateProjects: 正常に成功する", async () => {
    await register(db!)(authRequestMocks.register.validReq(), res!);

    const body: PostProjectRequest = { title: "Title" };

    // 保存されたcookieを取得
    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    // authorizeして、Project作成
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await createProject(db!)(mockReq({ body: body, cookies: cookies }), res!);

    // authorizeして、isUsersProjectを通した後に、updateProjectを実行
    res = createResponseMock();
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await isUsersProject(db!)(createRequestMock.withParams({ id: "1" }), res!, next!);
    await updateProject(db!)(createRequestMock.withParams({ id: "1" }), res!);

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining(body)
      })
    );
  });

  it("deleteProjects: 正常に完了する", async () => {
    await register(db!)(authRequestMocks.register.validReq(), res!);

    const body: PostProjectRequest = { title: "Title" };

    // 保存されたcookieを取得
    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    // authorizeして、Project作成
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await createProject(db!)(mockReq({ body: body, cookies: cookies }), res!);

    // authorizeして、isUsersProjectを通した後に、deleteProjectを実行
    res = createResponseMock();
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await isUsersProject(db!)(createRequestMock.withParams({ id: "1" }), res!, next!);
    await deleteProject(db!)(createRequestMock.withParams({ id: "1" }), res!);

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: null
      })
    );
  });
});
