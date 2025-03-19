import { NextFunction, Request, Response } from "express";

export type CustomErrorContent = {
  message: string;
  context?: { [key: string]: any };
};

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errors: CustomErrorContent[];
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errroHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.message);
  }

  return res.status(500).json({ message: "Something went wrong" });
};
