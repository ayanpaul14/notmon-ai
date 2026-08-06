import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes, getUserNotes, toggleShareNotes, getSharedNotes } from "../controllers/generate.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes", isAuth, generateNotes)
notesRouter.get("/history", isAuth, getUserNotes) 
notesRouter.post("/share/:id", isAuth, toggleShareNotes)
notesRouter.get("/shared/:shareId", getSharedNotes) // public view


export default notesRouter;