import { Response } from "express"
import { vi } from "vitest";

export const createResponseMock = (): Response => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res as Response;
}
