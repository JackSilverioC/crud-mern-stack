import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = async (req, res, next) => {
  const token = await req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, no token."
    });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "Forbidden, invalid token."
      });

    req.user = decoded;

    next();
  });
};
