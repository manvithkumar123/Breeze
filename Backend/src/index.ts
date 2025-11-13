import express, { Request, Response } from "express";
import { connectPostgres } from "./config/PostgreeDb";
import cors from "cors";
import userRouter from "./routes/UserRoute";
import newsRouter from "./routes/NewsRoute";
import cookie from "cookie-parser"
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
connectPostgres();

app.use(cors({
  origin: ["https://breeze12.netlify.app", "http://localhost:5173"],
  credentials: true,
}));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js Backend!");
});
app.use("/api/user",userRouter);
app.use("/api/news",newsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});