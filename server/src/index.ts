import express from "express";
import dotenv from "dotenv";
import snippetsRouter from "./routes/snippetRoutes";
import { errroHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use("/api/snippets", snippetsRouter);

app.use(errroHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
