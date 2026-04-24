vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createResponseMock } from "../../__mock__/index.js";
import { NextFunction, Request, Response } from "express";
import { Database } from "sqlite3";
import { register } from "../../controller/index.js";
import { authorize } from "../../middleware/index.js";
import { createRequestMock } from "../../__mock__/createRequest.mock.js";
import { cleanupDb } from "../tools/cleanupDb.js";

describe("authorize.ts", () => {
  let res: Response | null = null;
  let next: NextFunction | null = null;
  let db: Database | null = null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    res = createResponseMock(); // resを設定し直さないとテストバグの原因になる（チェーンの呼び出し回数など）
    await cleanupDb();
  }, 50000);
  afterEach(() => {
    res = null;
    next = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("tokenがある場合はdtoにuserIdを付加する", async () => {
    await register(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize(createRequestMock.withCookies(cookies), res!, next!);

    expect(res!.locals).toBeTruthy();
    expect(res!.locals.userId).toBeTruthy();
  });

  it("tokenがない場合はUnAuthorizedErrorを投げる", async () => {
    await expect(
      authorize(createRequestMock.withoutData(), res!, next!)
    ).rejects.toThrow();

    expect(res!.locals).toEqual({});
  });
});
