import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { createResponseMock, authRequestMocks } from "../../__mock__/index.js"
import { NextFunction, Response } from "express"
import { requestValidator } from "../../middleware/index.js";

describe("auth: request.guard", () => {
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


  // register
  it("register: 正しいリクエストは通過する", () => {
    requestValidator("register")(authRequestMocks.register.validReq(), res!, next!);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("register: Dos攻撃Request_1 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("register")(authRequestMocks.register.invalidReq_1(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it("register: Dos攻撃Request_2 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("register")(authRequestMocks.register.invalidReq_2(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it ("login: Dos攻撃Request_3 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("login")(authRequestMocks.login.invalidReq_3(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toBeCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it ("login: Dos攻撃Request_4 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("login")(authRequestMocks.login.invalidReq_4(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toBeCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });


  // login
  it ("login: 正しいリクエストは通過する", () => {
    requestValidator("login")(authRequestMocks.login.validReq(), res!, next!);
    expect(next).toBeCalledTimes(1);
  });

  it ("login: Dos攻撃Request_1 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("login")(authRequestMocks.login.invalidReq_1(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    )
  });
  it ("login: Dos攻撃Request_2 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("login")(authRequestMocks.login.invalidReq_2(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toBeCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it ("login: Dos攻撃Request_3 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("login")(authRequestMocks.login.invalidReq_3(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toBeCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
  it ("login: Dos攻撃Request_4 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    requestValidator("login")(authRequestMocks.login.invalidReq_4(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toBeCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
})
