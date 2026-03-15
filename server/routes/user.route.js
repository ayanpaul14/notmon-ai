import express from "express"

const userRouter = express.Router()

userRouter.get("/currentuser", isAuth, getCurrentUser)

export default userRouter

import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middleware/isAuth.js";