import { Request, Response } from "express";
import { snippetService } from "../services/snippetService";

export const getAllSnippetsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const snippets = await snippetService();

    return res.status(200).json(snippets);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
