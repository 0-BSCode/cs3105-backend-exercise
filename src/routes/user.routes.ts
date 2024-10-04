import { fetchUserController } from '@controllers/user.controllers';
import {Router} from 'express';

const userRoutes = Router();

userRoutes.get('/:id', fetchUserController);

export default userRoutes;