import { Request, Response } from "express";

export const errorResponse = (res: Response, status: number, err: Error) => {
  return res
    .status(status)
    .json(err.name);
}
