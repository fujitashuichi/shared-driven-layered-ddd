vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createResponseMock } from "../../__mock__/index.js";
import { Database } from "sqlite3";
import { Response } from "express";
import { createAppDb } from "../../db/index.js";
import { createProject, getProjects, register } from "../../controller/index.js";
import { PostProjectRequest } from "@pkg/shared";
import { createRequestMock } from "../../__mock__/createRequest.mock.js";

describe("project.controller", () => {
  let res: Response | null;
  let db: Database | null;

  beforeEach(async () => {
    res = createResponseMock();
    db = await createAppDb(":memory:");
    await register(authRequestMocks.register.validReq(), res!, db!);
    res = createResponseMock(); // resを設定し直さないとテストバグの原因になる（チェーンの呼び出し回数など）
  });
  afterEach(() => {
    res = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("createProject: 正常に作成が完了する", async () => {
    // userId=1で返ることが明確なため、冗長な処理を避けてuserIdをそのまま書く
    const reqBody: PostProjectRequest = { title: "Title", userId: 1 };
    await createProject(createRequestMock.withBody(reqBody), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it("getProjects: 正常に成功する", async () => {
    const reqBody: PostProjectRequest = { title: "Title", userId: 1 };
    await createProject(createRequestMock.withBody(reqBody), res!, db!);

    res = createResponseMock();
    await getProjects(createRequestMock.withBody({ userId: 1 }), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(200);
    expect(res!.send).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      projects: expect.arrayContaining([
        expect.objectContaining(reqBody)
      ])
    }));
  });
});
