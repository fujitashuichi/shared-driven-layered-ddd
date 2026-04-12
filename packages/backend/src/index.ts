import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createAppRouter } from "./routes/index.js";
import { globalErrorHandler } from "./middleware/index.js";
import { ENV } from "./config/env.js";
import { styleText } from "node:util";
import { notFoundHandler } from "./middleware/error/notFoundHandler.js";


const app = express();

app.use(cors({
  origin: [
    ENV.NODE_FE_URL,
    /https:\/\/.*-fujita-shuichis-projects\.vercel\.app\/?$/
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: "1kb" }));
app.use(cookieParser());


app.use("/", createAppRouter());
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

const nodeEnv = ENV.NODE_ENV;
if (nodeEnv === "development" || nodeEnv === "test") {
  app.listen(ENV.NODE_BE_PORT, () => {
    const url = ENV.NODE_BE_URL;
    const port = ENV.NODE_BE_PORT;

    process.stdout.write(styleText(
      ["greenBright"],
      `=====================================================\n`,
    ));

    process.stdout.write(styleText(
      ["greenBright", "dim"],
      `    time: ${new Date().toISOString()}\n`
    ));

    process.stdout.write(styleText(
      ["greenBright"],
      `    Server running on `
    ));
    process.stdout.write(styleText(
      ["greenBright", "bold", "underline"],
      `${url}:${port}`
    ));

    process.stdout.write(styleText(
      ["greenBright"],
      `\n=====================================================`
    ));
  });
}
