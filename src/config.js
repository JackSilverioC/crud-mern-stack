import { config } from "dotenv";

config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "some secret key";

export const MONGODB_URI = "mongodb://localhost/merndb";

export const PORT = process.env.PORT || 3000;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
