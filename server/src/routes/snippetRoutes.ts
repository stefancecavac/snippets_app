import express from "express";
import {
  deleteSnippetControler,
  getAllSnippetsController,
  getAllUserSnippetsController,
  getLikedSnippetsController,
  getSingleSnippetController,
  postSnippetController,
} from "../controllers/snippetController";
import { validate } from "../middlewares/validation";
import { snippetSchema } from "../db/schema/snippets";
import { authentication } from "../middlewares/authentication";
const router = express.Router();

router.get("/", getAllSnippetsController);

router.get("/my-snippets", authentication, getAllUserSnippetsController);
router.get("/my-snippets/liked", authentication, getLikedSnippetsController);

router.get("/:id", validate({ params: snippetSchema.pick({ id: true }) }), getSingleSnippetController);

router.post(
  "/",
  authentication,
  validate({ body: snippetSchema.pick({ code: true, language: true, snippetDescription: true, snippetName: true }) }),
  postSnippetController
);

router.delete("/:id", authentication, validate({ params: snippetSchema.pick({ id: true }) }), deleteSnippetControler);

export default router;
