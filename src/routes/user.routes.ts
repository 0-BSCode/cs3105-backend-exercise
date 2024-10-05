import { fetchUserController } from '@controllers/users/user.controllers';
import { authenticateMiddleware } from '@middleware/authenticate.middleware';
import {Router} from 'express';

const userRoutes = Router();

userRoutes.get('/:id', authenticateMiddleware, fetchUserController);

export default userRoutes;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users routes
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Fetches a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *         default: 0
 *     responses:
 *       200:
 *         description: A successful response
 */