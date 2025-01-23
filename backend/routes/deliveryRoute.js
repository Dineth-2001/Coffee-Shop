import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { addDelivery, getDeliveries, updateStatus, placeDelivery } from '../controllers/deliveryController.js';

const deliveryRouter = express.Router();

deliveryRouter.post('/add', addDelivery);
deliveryRouter.get('/get', getDeliveries);
deliveryRouter.put('/update/:delivery_id', updateStatus)
deliveryRouter.post('/place', authMiddleware, placeDelivery);

export default deliveryRouter;