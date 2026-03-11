vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createResponseMock } from "../../__mock__/index.js";
import { createAppDb } from "../../db/index.js";
import { NextFunction, Request, Response } from "express";
import { Database } from "sqlite3";
import { register } from "../../controller/index.js";
import { mockReq } from "sinon-express-mock";
import { authorize } from "../../middleware/authorize.js";
import { createRequestMock } from "../../__mock__/createRequest.mock.js";

describe("authorize.ts", () => {
  let res: Response | null = null;
  let next: NextFunction | null = null;
  let db: Database | null = null;

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

  it("tokenがある場合はdtoにuserIdを付加する", async () => {
    await register(authRequestMocks.register.validReq(), res!, db!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize(db!)(createRequestMock.withCookies(cookies), res!, next!);

    expect(res!.locals).toBeTruthy();
    expect(res!.locals.userId).toBeTruthy();
  });

  it("tokenがない場合はUnAuthorizedErrorを投げる", async () => {
    await expect(
      authorize(db!)(createRequestMock.withoutData(), res!, next!)
    ).rejects.toThrow();

    expect(res!.locals).toEqual({});
  });
});
