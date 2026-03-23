import { NextFunction, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createResponseMock, projectRequestMocks } from "../../__mock__/index.js";
import { requestValidator } from "../../middleware/index.js";
import { cleanupDb } from "../tools/cleanupDb.js";

describe("project: request.guard", () => {
  let res: Response | null;
  let next: NextFunction | null;
  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    await cleanupDb();
  }, 50000);
  afterEach(() => {
    res = null;
    next = null;
    vi.restoreAllMocks();
  });


  // post
  it("postProject: 正しいリクエスト_1は通過する", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.validReq_1(), res!, next!);
    expect(next).toHaveBeenCalledWith();
  });
  it("postProject: 正しいリクエスト_2は通過する", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.validReq_2(), res!, next!);
    expect(next).toHaveBeenCalledWith();
  });

  it("postProject: Dos攻撃Request_1 はerrorHandlerを呼ぶ", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_1(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
  it("postProject: Dos攻撃Request_2 はerrorHandlerを呼ぶ", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_2(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
  it("postProject: Dos攻撃Request_3 はerrorHandlerを呼ぶ", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_3(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
  it("postProject: Dos攻撃Request_4 はerrorHandlerを呼ぶ", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_4(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
})
