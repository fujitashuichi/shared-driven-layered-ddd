import { Request, Response } from "express";

export const notFoundHandler = (_: Request, res: Response) => {
  return res.status(404).json("404 Not Found");
}
