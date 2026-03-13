vi.stubEnv("NODE_JWT_SECRET", "secret");

import { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock } from "../../__mock__/index.js";
import { login, register } from "../../controller/index.js";
import { Database } from "sqlite3";
import { createAppDb } from "../../db/index.js";

describe("auth.controller", () => {
  let res: Response | null;
  let db: Database | null;

  beforeEach(async () => {
    res = createResponseMock();
    db = await createAppDb(":memory:");
  });
  afterEach(() => {
    res = null;
    db = null;
  });

  // register
  it("register: 正常に登録が完了する", async () => {
    await register(db!)(authRequestMocks.register.validReq(), res!);

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.cookie).toHaveBeenCalledWith(
      "token",
      expect.anything(),
      expect.anything()
    );
  });

  it("register: 重複するEmailは登録が失敗する", async () => {
    await register(db!)(authRequestMocks.register.validReq(), res!);
    res = createResponseMock();
    await expect(register(db!)(authRequestMocks.register.validReq(), res!))
      .rejects.toThrow();

    expect(res!.status).not.toHaveBeenCalled();
    expect(res!.cookie).not.toHaveBeenCalled();
    expect(res!.json).not.toHaveBeenCalled();
  });

  // login
  it("login: パスワードが一致する場合、okレスポンスを返してtokenを再発行する", async () => {
    const requestBody: Request["body"] = { email: "example@email.com", password: "TestPassword" };

    await register(db!)(createRequestMock.withBody(requestBody), res!);
    res = createResponseMock();
    await login(db!)(createRequestMock.withBody(requestBody), res!);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith(
      "token",
      expect.any(String),
      expect.objectContaining({ httpOnly: true })
    );
  });

  it("login: パスワードが一致しない場合、throwする", async () => {
    const email = "example@email.com";
    const registerRequestBody: Request["body"] = { email: email, password: "TestPassword" };
    const loginRequestBody: Request["body"] = { email: email, password: "ThIsISWroNGpASswORd" };

    await register(db!)(createRequestMock.withBody(registerRequestBody), res!);
    res = createResponseMock();
    await expect(login(db!)(createRequestMock.withBody(loginRequestBody), res!))
      .rejects.toThrow();

    expect(res.status).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
  });
});
