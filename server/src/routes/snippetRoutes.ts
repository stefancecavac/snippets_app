import express from "express";
import { deleteSnippetControler, getAllSnippetsController, postSnippetController } from "../controllers/snippetController";
import { deleteSnippetSchema, insertSnippetSchema } from "../db/schema/snippets";
import { validate } from "../middlewares/validation";

const router = express.Router();

router.get("/", getAllSnippetsController);
router.post("/", validate({ body: insertSnippetSchema }), postSnippetController);
router.delete("/:id", validate({ params: deleteSnippetSchema }), deleteSnippetControler);

export default router;
