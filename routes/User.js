import { Router } from "express";
import { login, register } from "../controllers/User.js";

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);