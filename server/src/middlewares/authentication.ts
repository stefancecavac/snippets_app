import { NextFunction, Request, Response } from "express";
import AppError from "./errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    user?: { userId: string };
  }
}

export interface JwtVerifiedPayload extends JwtPayload {
  userId: string;
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("No auth token", 403));
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string) as JwtVerifiedPayload;
    if (!verifiedToken) {
      return next(new AppError("Invalid auth token", 403));
    }
    req.user = { userId: verifiedToken.userId };

    next();
  } catch (error) {
    res.status(403).json({ message: "jwt expired" });
  }
};
