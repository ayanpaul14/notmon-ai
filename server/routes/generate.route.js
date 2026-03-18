import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes, getUserNotes } from "../controllers/generate.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes", isAuth, generateNotes)
notesRouter.get("/history", isAuth, getUserNotes) 

export default notesRouter;