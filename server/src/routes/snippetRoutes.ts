import express from "express";
import { getAllSnippetsController } from "../controllers/snippetController";

const router = express.Router();

router.get("/", getAllSnippetsController);

export default router;
