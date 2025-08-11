import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../utils/constant";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prisma";
import ExpressError from "../utils/errorHandler";

const generateRefreshToken = (id: string | number) => {
  return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "1d" }); // Longer expiration
};

// ---------------- LOGIN ----------------
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ExpressError("Email and password are required", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ExpressError("User not found.", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ExpressError("Invalid credentials.", 401);
    }

    const refreshToken = generateRefreshToken(user.id);

    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const constructedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      department : user.department
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: constructedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Register User (updated to accept socialLinks & codingProfiles at signup)
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      role,
      department,
      yearOfGraduation,
      bio,
      skills,
      socialLinks, // { linkedin?, github?, portfolio? }
      codingProfiles, // { leetcodeUser?, codeforcesUser? }
    } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "student" | "mentor";
      department?: string;
      yearOfGraduation?: number;
      bio?: string;
      skills?: string[];
      socialLinks?: { linkedin?: string; github?: string; portfolio?: string };
      codingProfiles?: { leetcodeUser?: string; codeforcesUser?: string };
    };

    

    // Basic validation (add more robust validation as needed)
    if (!name || !email || !password || !role || !department) {
      throw new ExpressError(
        "Missing required fields: name, email, password, role, or department",
        400
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ExpressError("User already exists with this email", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Build data object for prisma.create
    const createData: any = {
      name,
      email,
      password: hashedPassword,
      role,
      department,
      yearOfGraduation: yearOfGraduation ?? null,
      bio: bio ?? null,
      skills: Array.isArray(skills) ? skills : [],
      // leave overallRankScore default
    };

    // Attach nested create for socialLinks if provided
    if (socialLinks && typeof socialLinks === "object") {
      createData.socialLinks = {
        create: {
          linkedin: socialLinks.linkedin ?? null,
          github: socialLinks.github ?? null,
          portfolio: socialLinks.portfolio ?? null,
        },
      };
    }

    // Attach nested create for codingProfiles if provided
    if (codingProfiles && typeof codingProfiles === "object") {
      createData.codingProfiles = {
        create: {
          leetcodeUser: codingProfiles.leetcodeUser ?? null,
          codeforcesUser: codingProfiles.codeforcesUser ?? null,
        },
      };
    }

    const user = await prisma.user.create({
      data: createData,
      include: {
        socialLinks: true,
        codingProfiles: true,
      },
    });

    const refreshToken = generateRefreshToken(user.id);

    // Send refresh token as an httpOnly cookie
    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    // Construct sanitized user (omit password)
    const constructedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      yearOfGraduation: user.yearOfGraduation,
      bio: user.bio,
      skills: user.skills,
      socialLinks: user.socialLinks ?? null,
      codingProfiles: user.codingProfiles ?? null,
      overallRankScore: user.overallRankScore,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "Signup successful.",
      user: constructedUser,
    });
  } catch (error) {
    next(error);
  }
};

// verifyUser - return sanitized user (no password)
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId as string },
      include: {
        socialLinks: true,
        codingProfiles: true,
      },
    });

    if (!user) {
      throw new ExpressError("User not found", 404);
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      yearOfGraduation: user.yearOfGraduation,
      bio: user.bio,
      skills: user.skills,
      socialLinks: user.socialLinks ?? null,
      codingProfiles: user.codingProfiles ?? null,
      overallRankScore: user.overallRankScore,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.json({ success: true, user: safeUser });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};