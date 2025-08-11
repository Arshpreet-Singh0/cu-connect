import express, { type NextFunction, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { register, login, verifyUser, logout } from "./controllers/auth";
import { authMiddleware } from "./middlewares/authMiddleware";
import cors from 'cors';

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

