import { NextFunction, Request, Response } from "express";
import {
  createSnippetService,
  deleteSnippetByIdService,
  getAllSnippetsByUserId,
  getAllSnippetService,
  getSnippetByIdService,
} from "../services/snippetService";
import AppError from "../middlewares/errorHandler";

export const getAllSnippetsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;

    const snippets = await getAllSnippetService({ q, page });

    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};

export const getAllUserSnippetsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError("No userId provided", 400));
    }
    const snippets = await getAllSnippetsByUserId(userId);

    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};

export const getSingleSnippetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const snippets = await getSnippetByIdService(id);

    if (snippets.length === 0) {
      return next(new AppError("No snippet with that id found", 400));
    }

    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};

export const postSnippetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, language, snippetDescription, snippetName, tags } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return next(new AppError("No userId provided", 400));
    }

    const snippets = await createSnippetService({ code, language, snippetDescription, snippetName, userId, tags });

    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};

export const deleteSnippetControler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const snippets = await deleteSnippetByIdService(id);

    if (snippets.length === 0) {
      return next(new AppError("No snippet with that id found", 400));
    }

    res.status(200).json(snippets);
  } catch (error) {
    next(error);
  }
};
