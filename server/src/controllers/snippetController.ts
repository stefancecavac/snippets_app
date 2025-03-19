import { NextFunction, Request, Response } from "express";
import { snippetService } from "../services/snippetService";
import AppError from "../middlewares/errorHandler";

export const getAllSnippetsController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const snippets = await snippetService();

    return res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};
