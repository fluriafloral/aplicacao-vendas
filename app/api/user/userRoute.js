// 3d Party Modules
import { Router } from 'express';

// Local Modules
import { register, login } from './userController';

// Initialization
const userRouter = Router();

// Requests
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;