import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createResponseMock } from "../../__mock__/index.js";
import { NextFunction, Response } from "express";
import { Database } from "sqlite3";
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

  it("tokenがない場合はUnAuthorizedErrorを投げる", async () => {
    await expect(
      authorize()(createRequestMock.withoutData(), res!, next!)
    ).rejects.toThrow();

    expect(res!.locals).toEqual({});
  });
});
