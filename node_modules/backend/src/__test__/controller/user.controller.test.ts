vi.stubEnv("NODE_JWT_SECRET", "secret");

import { Request, Response } from "express";
import { Database } from "sqlite3";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createResponseMock } from "../../__mock__/index.js";
import { createAppDb } from "../../db/index.js";
import { logout, register, session } from "../../controller/index.js";
import { createRequestMock } from "../../__mock__/createRequest.mock.js";

describe("user.controller", () => {
  let res: Response | null;
  let db: Database | null;

  beforeEach(async () => {
    res = createResponseMock();
    db = await createAppDb(":memory:");
    res = createResponseMock(); // resを設定し直さないとテストバグの原因になる（チェーンの呼び出し回数など）
  });
  afterEach(() => {
    res = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("session: session中の状態を正常に取得する", async () => {
    await register(authRequestMocks.register.validReq(), res!, db!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies = { [name]: value };
    res = createResponseMock();
    await session(createRequestMock.withCookies(cookies), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(200);
  });

  it("session: 非session中の状態を正常に取得する", async () => {
    await register(authRequestMocks.register.validReq(), res!, db!);

    let cookieData: [name: string, val: any] | undefined = vi.mocked(res!.cookie).mock.calls[0]!;
    let cookies: Request["cookies"] | undefined = { [cookieData[0]]: cookieData[1] };
    res = createResponseMock();
    await logout(createRequestMock.withCookies(cookies), res!);

    cookieData = vi.mocked(res!.cookie).mock.calls[0];
    cookies = cookieData ? { [cookieData[0]]: cookieData[1] } : {};
    res = createResponseMock();
    await session(createRequestMock.withCookies(cookies), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(401);
  });
});
