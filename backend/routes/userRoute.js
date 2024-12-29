import express from 'express';
import { addUser, getUsers } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/add', addUser);
userRouter.get('/get', getUsers);

export default userRouter;
