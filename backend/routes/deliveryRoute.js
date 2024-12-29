import express from 'express';
import { addDelivery, getDeliveries } from '../controllers/deliveryController.js';

const deliveryRouter = express.Router();

deliveryRouter.post('/add', addDelivery);
deliveryRouter.get('/get', getDeliveries);

export default deliveryRouter;