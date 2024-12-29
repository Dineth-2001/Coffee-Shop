import express from 'express';
import { addCartItem, getCartItemsByCartId } from '../controllers/cart_itemController.js';

const cart_itemRouter = express.Router();

cart_itemRouter.post('/addCartItem', addCartItem);
cart_itemRouter.get('/getCartItemsByCartId/:cart_id', getCartItemsByCartId);

export default cart_itemRouter;