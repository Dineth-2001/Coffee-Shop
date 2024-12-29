import cartModel from '../models/cartModel.js';

// Add a new cart
const addCart = async (req, res) => {
    try {
        const cart = new cartModel({
            user_id: req.body.user_id,
            total: req.body.total,
        });
        await cart.save();
        res.json({success: true, message: 'Cart added successfully'})
    } catch (error) {
        res.json({success: false, message: 'Failed to add cart'})
    }
};

// Get carts by user id
const getCartsByUserId = async (req, res) => {
    try {
        const carts = await cartModel.findAll({ where: { user_id: req.params.user_id } });
        res.json(carts);
    } catch (error) {
        res.json({success: false, message: 'Failed to get carts'})
    }
};

export { addCart, getCartsByUserId };
