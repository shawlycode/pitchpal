import { Router } from "express";
import { login, logout, profile, register } from "../controllers/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', isAuthenticated, profile);
userRouter.post('/logout', isAuthenticated, logout);
