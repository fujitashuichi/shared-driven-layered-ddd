import { NextFunction, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createResponseMock, projectRequestMocks } from "../../__mock__/index.js";
import { requestValidator } from "../../middleware/index.js";

describe("project: request.guard", () => {
  let res: Response | null;
  let next: NextFunction | null;
  beforeEach(() => {
    res = createResponseMock();
    next = vi.fn();
  });
  afterEach(() => {
    res = null;
    next = null;
    vi.restoreAllMocks();
  });


  // post
  it("postProject: 正しいリクエスト_1は通過する", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.validReq_1(), res!, next!);
    expect(next).toHaveBeenCalledTimes(1);
  });
  it("postProject: 正しいリクエスト_2は通過する", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.validReq_2(), res!, next!);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("postProject: Dos攻撃Request_1 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_1(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it("postProject: Dos攻撃Request_2 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_2(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it("postProject: Dos攻撃Request_3 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_3(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it("postProject: Dos攻撃Request_4 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("postProject")(projectRequestMocks.postProject.invalidReq_4(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
})
