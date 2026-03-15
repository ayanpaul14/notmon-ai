// import express from "express"
// import isAuth from "../middleware/isAuth.js"
// import { generateNotes } from "../controllers/generate.controller.js"

// const notesRouter = express.Router()

// notesRouter.post("/generate-notes", isAuth,generateNotes)

// export default notesRouter


import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes, getUserNotes } from "../controllers/generate.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes", isAuth, generateNotes)
notesRouter.get("/history", isAuth, getUserNotes) // ✅ new

export default notesRouter