vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock } from "../../__mock__/index.js";
import { NextFunction, Request, Response } from "express";
import { Database } from "sqlite3";
import { createProject, register } from "../../controller/index.js";
import { authorize } from "../../middleware/index.js";
import { isUsersProject } from "../../middleware/isUsersProject.js";
import { ProjectUndefinedError } from "../../error/ProjectError.js";

describe("isUsersProject", () => {
  let res: Response | null = null;
  let next: NextFunction | null = null;
  let db: Database | null = null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    res = createResponseMock();
  });
  afterEach(() => {
    res = null;
    next = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("ユーザーが所持するprojectであれば次へ進む", async () => {
    await register()(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    createProject()(createRequestMock.withBody({ title: "Title" }), res!);

    const req = createRequestMock.withParams({ id: "1" });
    await isUsersProject()(req, res!, next!);

    expect(next).toHaveBeenCalled();
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
