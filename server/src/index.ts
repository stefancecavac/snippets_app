import express from "express";
import dotenv from "dotenv";
import snippetsRouter from "./routes/snippetRoutes";

dotenv.config();

const app = express();

app.use("/api/snippets", snippetsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
