import { loginController, registerController } from "@controllers/auth/auth.controllers";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/login', loginController);
authRoutes.post('/register', registerController);

export default authRoutes;