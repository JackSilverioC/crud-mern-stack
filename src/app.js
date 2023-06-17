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

const corsOptions = {
  origin: [
    "http://localhost:3000",
    FRONTEND_URL,
    "https://crud-stack-mern-api.netlify.app"
    // your origins here
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/dist"));

//   app.get("*", (req, res) => {
//     console.log(path.resolve("client", "dist", "index.html"));
//     res.sendFile(path.resolve("client", "dist", "index.html"));
//   });
// }
const path = await import("path");
app.use(express.static(join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  console.log(path.resolve("client", "dist", "index.html"));
  res.sendFile(path.resolve("client", "dist", "index.html"));
});

export default app;
