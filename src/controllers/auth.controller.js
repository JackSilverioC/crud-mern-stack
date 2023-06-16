import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        error: ["Ya existe un usuario con ese email"]
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id
    });

    res.cookie("token", token, {
      httpOnly: true,
      domain:
        process.env.NODE_ENV === "development"
          ? "http//localhost:5173"
          : "https://crud-mern-stack.vercel.app"
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        error: ["Usuario no encontrado"]
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        error: ["Contraseña incorrecta"]
      });
    }

    const token = await createAccessToken({
      id: userFound._id
    });

    res.cookie("token", token, {
      httpOnly: true,
      domain:
        process.env.NODE_ENV === "development"
          ? "http//localhost:5173"
          : "https://crud-mern-stack.vercel.app"
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    domain:
      process.env.NODE_ENV === "development"
        ? "http//localhost:5173"
        : "https://crud-mern-stack.vercel.app",
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({
      error: ["Usuario no encontrado  "]
    });

  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({
      error: ["No autorizado"]
    });

  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err)
      return res.status(401).json({
        error: ["No autorizado"]
      });

    const userFound = await User.findById(decoded.id);
    if (!userFound)
      return res.status(401).json({
        error: ["No autorizado"]
      });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  });
};
