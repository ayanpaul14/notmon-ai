import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./utils/connectDb.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";


const PORT = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());
app.use(cors(
    {
        origin: ["https://notmon-ai.vercel.app", "http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
))

app.use(express.json());



app.get("/", (req, res) => {
    res.json({"message": "ExamNotes AI is running 🚀"});
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});
