import { Router } from "express";
import { register } from "../controllers/User.js";

export const userRouter = Router();

userRouter.post('/register', register);