vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createResponseMock } from "../../__mock__/response.mock.js";
import { cleanupDb } from "../tools/cleanupDb.js";
import { logout, register } from "../../controller/auth.controller.js";
import { authRequestMocks } from "../../__mock__/auth.request.mock.js";
import { NextFunction, Request, Response } from "express";
import { createRequestMock } from "../../__mock__/createRequest.mock.js";
import { UnAuthorizedError } from "../../error/AuthError.js";
import { session_v2 } from "../../auth-js/auth-v2.controller.js";


describe("auth_v2.controller", () => {
  let res: Response | null;
  let next: NextFunction | null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn().mockReturnThis();
    await cleanupDb();
  }, 50000);
  afterEach(() => {
    res = null;
    vi.restoreAllMocks();
  });

  it("session: session中の状態を正常に取得する", async () => {
    await register()(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies = { [name]: value };

    await session_v2(createRequestMock.withCookies(cookies), res!);

    expect(res!.status).toHaveBeenCalledWith(200);
  });

  it("session: 非session中の状態を正常に取得する", async () => {
    await register()(authRequestMocks.register.validReq(), res!);

    let [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    let cookies: Request["cookies"] | undefined = { [name]: value };
    res = createResponseMock();
    logout(createRequestMock.withCookies(cookies), res!);

    expect(vi.mocked(res!.cookie).mock.calls[0]).toBeFalsy();

    res = createResponseMock();
    await expect(
      session_v2(createRequestMock.withCookies({}), res!)
    ).rejects.toThrow(expect.any(UnAuthorizedError));
  });
});
