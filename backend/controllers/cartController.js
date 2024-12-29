import cartModel from '../models/cartModel.js';

// Add a new cart
const addCart = async (req, res) => {
    try {
        const cart = new cartModel({
            user_id: req.body.user_id,
        });
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get carts by user id
const getCartsByUserId = async (req, res) => {
    try {
        const carts = await cartModel.find({ user_id: req.params.user_id });
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { addCart, getCartsByUserId };
