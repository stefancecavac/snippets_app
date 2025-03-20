import express from "express";
import {
  deleteSnippetControler,
  getAllSnippetsController,
  getSingleSnippetController,
  postSnippetController,
} from "../controllers/snippetController";
import { validate } from "../middlewares/validation";
import { snippetSchema } from "../db/schema/snippets";

const router = express.Router();

router.get("/", getAllSnippetsController);
router.get("/:id", validate({ params: snippetSchema.pick({ id: true }) }), getSingleSnippetController);
router.post(
  "/",
  validate({ body: snippetSchema.pick({ code: true, language: true, snippetDescription: true, snippetName: true }) }),
  postSnippetController
);
router.delete("/:id", validate({ params: snippetSchema.pick({ id: true }) }), deleteSnippetControler);

export default router;
