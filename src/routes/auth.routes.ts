import { loginController, registerController } from "@controllers/auth/auth.controllers";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/login', loginController);
authRoutes.post('/register', registerController);

export default authRoutes;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Logs in a user given their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: juan@gmail.com
 *               password:
 *                 type: string
 *                 default: password
 *     responses:
 *       200:
 *         description: A successful response
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: juan
 *               email:
 *                 type: string
 *                 default: juan@gmail.com
 *               password:
 *                 type: string
 *                 default: password
 *               confirmPassword:
 *                 type: string
 *                 default: password
 *     responses:
 *       201:
 *         description: A successful response
 */