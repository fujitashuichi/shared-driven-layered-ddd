import { Response } from "express";
import { afterEach, beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { createResponseMock } from "../__mock__/index.js";
import { globalErrorHandler } from "../middleware/index.js";
import { ConfirmPasswordError, EmailAlreadyRegisteredError, InvalidPasswordError, UserAuthError,  } from "../error/index.js";
import { DuplicateProjectError, ProjectError, ProjectUndefinedError } from "../error/ProjectError.js";
import { UserUndefinedError } from "../error/UserError.js";

describe("globalErrorHandlerが正しく機能する", () => {
  const _req = vi.fn();
  const _next = vi.fn();
  let res: Response | null = null;
  let err: Error | null = null;
  let consoleErrorMock: MockInstance;
  beforeEach(() => {
    res = createResponseMock();
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    res = null;
    err = null;
    consoleErrorMock.mockRestore();
  });

  it("UserUndefinedError", () => {
    err = new UserUndefinedError();
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(404);
  });

  // register
  it("EmailAlreadyRegisteredError", () => {
    err = new EmailAlreadyRegisteredError("example@email.com");
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(409);
  });
  it("InvalidPasswordError", () => {
    err = new InvalidPasswordError();
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(400);
  });

  // login
  it("ConfirmPasswordError", () => {
    err = new ConfirmPasswordError();
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(401);
  });

  // other
  it("UserAuthError", () => {
    err = new UserAuthError("Any Error Massage");
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(400);
  });

  // postProject
  it("DuplicateProjectError", () => {
    err = new DuplicateProjectError();
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(400);
  });

  // patchProject
  it("ProjectUndefinedError", () => {
    err = new ProjectUndefinedError();
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(404);
  });

  // other
  it("OtherUserAuthError", () => {
    err = new UserAuthError("Any Message");
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(400);
  });
  it("OtherProjectError", () => {
    err = new ProjectError("Any Message");
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(400);
  });

  it("Other Uncaught Error", () => {
    err = new Error("Normal Error");
    globalErrorHandler(err as any, _req as any, res!, _next);
    expect(res!.status).toBeCalledWith(500);
  });
})
