import { Response } from "express";
import { afterEach, beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { createResponseMock } from "../__mock__/index.js";
import { globalErrorHandler } from "../middleware/index.js";
import { ConfirmPasswordError, EmailAlreadyRegisteredError, InvalidPasswordError, AuthError, DatabaseGetError, DatabaseDeleteError } from "../error/index.js";
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
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(404);
  });

  // register
  it("EmailAlreadyRegisteredError", () => {
    err = new EmailAlreadyRegisteredError("example@email.com");
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(409);
  });
  it("InvalidPasswordError", () => {
    err = new InvalidPasswordError();
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(400);
  });

  // login
  it("ConfirmPasswordError", () => {
    err = new ConfirmPasswordError();
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(401);
  });

  // other
  it("UserAuthError", () => {
    err = new AuthError("Any Error Massage", "AuthError");
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(400);
  });

  // postProject
  it("DuplicateProjectError", () => {
    err = new DuplicateProjectError();
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(400);
  });

  // patchProject
  it("ProjectUndefinedError", () => {
    err = new ProjectUndefinedError();
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(404);
  });

  // other
  it("OtherUserAuthError", () => {
    err = new AuthError("Any Message", "AuthError");
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(400);
  });
  it("OtherProjectError", () => {
    err = new ProjectError("Any Message", "ProjectError");
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(400);
  });

  describe("DbErrorをInternalServerErrorとして扱う", () => {
    it("DatabaseGetError", () => {
      const getError = new DatabaseGetError(":memory:", "table");
      globalErrorHandler(getError, _req as any, res!, _next);

      expect(res!.status).toHaveBeenCalledWith(500);
      expect(res!.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errorName: expect.stringMatching("InternalServerError")
        })
      );
    });

    it("DatabaseDeleteError", () => {
      const deleteError = new DatabaseDeleteError(":memory:", "table");
      globalErrorHandler(deleteError, _req as any, res!, _next);

      expect(res!.status).toHaveBeenCalledWith(500);
      expect(res!.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errorName: expect.stringMatching("InternalServerError")
        })
      );
    })
  });

  it("Other Uncaught Error", () => {
    err = new Error("Normal Error");
    globalErrorHandler(err, _req as any, res!, _next);
    expect(res!.status).toHaveBeenCalledWith(500);
  });
})
