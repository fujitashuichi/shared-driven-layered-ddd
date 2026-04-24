vi.stubEnv("NODE_JWT_SECRET", "secret");

import { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock } from "../../__mock__/index.js";
import { logout, register, session } from "../../controller/index.js";
import { UnAuthorizedError } from "../../error/index.js";
import { cleanupDb } from "../tools/cleanupDb.js";

describe("user.controller", () => {
  let res: Response | null;

  beforeEach(async () => {
    res = createResponseMock();
    res = createResponseMock();
    await cleanupDb();
  }, 50000);
  afterEach(() => {
    res = null;
    vi.restoreAllMocks();
  });

  it("session: session中の状態を正常に取得する", async () => {
    await register(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies = { [name]: value };
    res = createResponseMock();
    await session(createRequestMock.withCookies(cookies), res!);

    expect(res!.status).toHaveBeenCalledWith(200);
  });

  it("session: 非session中の状態を正常に取得する", async () => {
    await register(authRequestMocks.register.validReq(), res!);

    let [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    let cookies: Request["cookies"] | undefined = { [name]: value };
    res = createResponseMock();
    logout(createRequestMock.withCookies(cookies), res!);

    expect(vi.mocked(res!.cookie).mock.calls[0]).toBeFalsy();

    res = createResponseMock();
    await expect(
      session(createRequestMock.withCookies({}), res!)
    ).rejects.toThrow(expect.any(UnAuthorizedError));
  });
});
