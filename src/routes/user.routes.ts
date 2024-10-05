import { fetchUserController } from '@controllers/users/user.controllers';
import { authenticateMiddleware } from '@middleware/authenticate.middleware';
import {Router} from 'express';

const userRoutes = Router();

userRoutes.get('/:id', authenticateMiddleware, fetchUserController);

export default userRoutes;