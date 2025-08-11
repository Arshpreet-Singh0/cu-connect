import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constant";
import type { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/errorHandler";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ExpressError("Not authenticated", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return next(new ExpressError("Invalid token", 401));
  }
};
