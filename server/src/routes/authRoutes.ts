import express from "express";

import { validate } from "../middlewares/validation";
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from "../controllers/authController";
import { usersSchema } from "../db/schema/users";
import { authentication } from "../middlewares/authentication";

const router = express.Router();

router.post("/register", validate({ body: usersSchema.pick({ email: true, password: true }) }), registerUserController);
router.post("/login", loginUserController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutUserController);

router.use(authentication);
router.get("/user", getCurrentUserController);

export default router;
