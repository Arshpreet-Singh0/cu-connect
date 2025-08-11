import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { register, login, verifyUser, logout } from "./controllers/auth";
import { authMiddleware } from "./middlewares/authMiddleware";
import cors from "cors";
import { generateText } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { careerPrompt } from "./utils/careerPrompt";
import { prisma } from "./utils/prisma";

const app = express();
const port = 8080;

//cors
app.use(
  cors({
    origin: process.env.ALLOWED_CLIENTS?.split(",").map((origin) =>
      origin.trim()
    ) || ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.post("/signup", register);
app.post("/login", login);
app.get("/verify", authMiddleware, verifyUser);
app.post("/logout", logout);

app.post("/career-advice", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Please provide a question" });
    }

    // Generate AI response
    const { text } = await generateText({
      model: openrouter("anthropic/claude-3-haiku"),
      prompt: careerPrompt(question),
    });

    res.json({ advice: text });
  } catch (error) {
    console.error("Career advice API error:", error);
    res.status(500).json({ error: "Failed to get advice" });
  }
});

app.get("/mentors", async (req, res, next) => {
  try {
    const mentors = await prisma.user.findMany({
      where: {
        role: "mentor",
      },
      select: {
        id: true,
        name: true,
        codingProfiles: true,
        profileImage: true,
        skills: true,
        socialLinks: true,
        currCompany: true,
        department: true,
        role: true,
      },
    });

    res.status(200).json({ mentors });
  } catch (error) {
    next(error);
  }
});

app.post("/askquestion", authMiddleware, async (req, res, next) => {
  try {
    const { question, desccription } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newQuestion = await prisma.questions.create({
      data: {
        question,
        desccription,
        userId,
      },
    });

    res.status(201).json({
      message: "Question posted successfully",
      success: true,
      question: newQuestion,
    });
  } catch (error) {
    next(error);
  }
});
app.get("/question", async (req, res, next) => {
  try {
    const questions = await prisma.questions.findMany({
      include: {
        user: {
          select: {
            name: true,
            id: true,
            department : true
          },
        },
        replies: {
          include: {
            user: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(questions);
  } catch (error) {
    next(error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
