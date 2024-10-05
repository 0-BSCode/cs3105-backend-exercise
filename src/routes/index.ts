import { Router } from "express"
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);

export default routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password (this is hashed in the database)
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *       example:
 *         id: 1
 *         name: Bryan Sanchez
 *         email: bry@gmail.com
 *         password: some-password
 *         createdAt: 2020-03-10T04:05:06.157Z
 */