import express from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/get', getUsers);
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
// userRouter.post('/logout', logoutUser);

export default userRouter;
