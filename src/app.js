import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

app.use(express.static(join(__dirname, "../client/dist")));

export default app;
