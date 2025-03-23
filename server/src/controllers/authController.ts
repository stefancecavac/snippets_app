import { NextFunction, Request, Response } from "express";
import { createUserService, getUserByEmailService, getUserByIdService } from "../services/authService";
import AppError from "../middlewares/errorHandler";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../util/generateAccessToken";
import { generateRefreshToken } from "../util/generateRefreshToken";
import jwt from "jsonwebtoken";
import { JwtVerifiedPayload } from "../middlewares/authentication";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);
    if (user) {
      return next(new AppError("User with that email already exists", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const savedUser = await createUserService({ email: email, password: hashPassword });
    const accessToken = generateAccessToken(savedUser.id);

    const refreshToken = generateRefreshToken(savedUser.id);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 259200000, // 3 days
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);
    if (!user) {
      return next(new AppError("Invalid credentials", 400));
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return next(new AppError("Invalid credentials", 400));
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 259200000, // 3 days
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next(new AppError("No userId provided", 400));
    }
    const user = await getUserByIdService(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return next(new AppError("No refresh token", 403));
  }

  try {
    const verifiedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string) as JwtVerifiedPayload;
    if (!verifiedToken) {
      return next(new AppError("Invalid refresh token", 403));
    }

    const accessToken = generateAccessToken(verifiedToken.userId);

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("refresh_token");
  res.status(201).json({ message: "Logged out" });
};
