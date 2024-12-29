import express from 'express';
import { addCart, getCartsByUserId } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/addCart', addCart);
cartRouter.get('/getCartsByUserId/:cart_id', getCartsByUserId);

export default cartRouter;
