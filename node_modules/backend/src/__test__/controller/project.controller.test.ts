vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createResponseMock } from "../../__mock__/index.js";
import { Database } from "sqlite3";
import { NextFunction, Request, Response } from "express";
import { createAppDb } from "../../db/index.js";
import { createProject, getProjects, register } from "../../controller/index.js";
import { PostProjectRequest } from "@pkg/shared";
import { createRequestMock } from "../../__mock__/createRequest.mock.js";
import { authorize } from "../../middleware/index.js";
import { mockReq } from "sinon-express-mock";

describe("project.controller", () => {
  let res: Response | null;
  let next: NextFunction | null;
  let db: Database | null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    db = await createAppDb(":memory:");
    res = createResponseMock(); // resを設定し直さないとテストバグの原因になる（チェーンの呼び出し回数など）
  });
  afterEach(() => {
    res = null;
    next = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("createProject: 正常に作成が完了する", async () => {
    await register(authRequestMocks.register.validReq(), res!, db!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);

    await createProject(mockReq({ body: { title: "Title" }, cookies: cookies }), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it("getProjects: 正常に成功する", async () => {
    await register(authRequestMocks.register.validReq(), res!, db!);

    const body: PostProjectRequest = { title: "Title" };

    // 保存されたcookieを取得
    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    // authorizeして、Project作成
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await createProject(mockReq({ body: body, cookies: cookies }), res!, db!);

    // authorizeして、getProjectを実行
    res = createResponseMock();
    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);
    await getProjects(createRequestMock.withoutData(), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(200);
    expect(res!.send).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      projects: expect.arrayContaining([
        expect.objectContaining(body)
      ])
    }));
  });
});
