import express from "express";

import { authentication } from "../middlewares/authentication";
import { toggleLikeController } from "../controllers/LikesController";

const router = express.Router();

router.use(authentication);
router.post("/like-snippet", toggleLikeController);

export default router;
