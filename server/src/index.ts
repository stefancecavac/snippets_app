import express from "express";
import dotenv from "dotenv";
import snippetsRouter from "./routes/snippetRoutes";
import authRouter from "./routes/authRoutes";
import likeRouter from "./routes/likeRoutes";
import { errroHandler } from "./middlewares/errorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.ORIGIN ?? "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("/api/snippets", snippetsRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likeRouter);

app.use(errroHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
