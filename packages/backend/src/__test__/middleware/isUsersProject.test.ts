import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { createResponseMock } from "../../__mock__/index.js";
import { NextFunction, Response } from "express";
import { cleanupDb } from "../tools/cleanupDb.js";


describe("isUsersProject", () => {
  let res: Response | null = null;
  let next: NextFunction | null = null;


  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    await cleanupDb();
  }, 100000);
  afterEach(() => {
    res = null;
    next = null;
  });

  it("ユーザーが所持するprojectであれば次へ進む", async () => {});

  it("ユーザーが所持していないprojectに対して、ErrorHandlerを呼ぶ", async () => {});
});
