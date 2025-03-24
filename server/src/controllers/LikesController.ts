import { NextFunction, Request, Response } from "express";
import { toggleLikeService } from "../services/likesService";
import AppError from "../middlewares/errorHandler";

export const toggleLikeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError("No userId provided", 400));
    }
    const { snippetId } = req.body;

    const like = await toggleLikeService(userId, snippetId);

    res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};
