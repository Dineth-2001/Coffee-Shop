import cartModel from '../models/cartModel.js';
import cart_itemModel from '../models/cart_itemModel.js';
import itemModel from '../models/itemModel.js';
import userModel from '../models/userModel.js';

// Add a new cart
const addCart = async (req, res) => {
    const { user_id, items } = req.body; // items is an array of { item_id, quantity }

    try {
        const cart = new cartModel({
            user_id: user_id,
            total: 0, 
        });
        await cart.save();

        let total = 0;

        // Add items to the cart_item table and calculate the total
        for (const item of items) {
            const itemDetails = await itemModel.findOne({ where: { item_id: item.item_id } });
            if (!itemDetails) {
                return res.json({ success: false, message: `Item with ID ${item.item_id} not found` });
            }
            const sub_total = item.quantity * itemDetails.price;
            total += sub_total;

            const cart_item = new cart_itemModel({
                cart_id: cart.cart_id,
                item_id: item.item_id,
                quantity: item.quantity,
                sub_total: sub_total,
            });
            await cart_item.save();
        }

        // Update the total of the cart
        cart.total = total;
        await cart.save();

        res.json({ success: true, message: 'Cart added successfully', cart_id: cart.cart_id });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'Failed to add cart' });
    }
};

// Get carts by user id
const getCartsByUserId = async (req, res) => {
    try {
        // Fetch carts for the specified user_id
        const carts = await cartModel.findAll({
            where: { user_id: req.params.user_id }
        });

        // Check if any carts are found for the user
        if (carts.length === 0) {
            return res.json({ success: false, message: 'No carts available for the given User ID' });
        }

        // Include cart items for each cart
        const cartsWithItems = await Promise.all(carts.map(async (cart) => {
            const cart_items = await cart_itemModel.findAll({
                where: { cart_id: cart.cart_id },
                include: [{
                    model: itemModel,
                    attributes: { exclude: ['image'] },  
                }]
            });
            return { ...cart.dataValues, cart_items };  // Combine cart details with items
        }));

        // Fetch the user name
        const user = await userModel.findOne({ 
            where: { user_id: req.params.user_id },
            attributes: { exclude: ['password', 'email'] } 
        });

        res.json({ success: true, carts: cartsWithItems, user });

    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'Failed to get cart details' });
    }
};

// Get cart details by cart id
const getCartDetailsByCartId = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ where: { cart_id: req.params.cart_id } });
        if (!cart) {
            return res.json({ success: false, message: 'Cart not found' });
        }

        const cart_items = await cart_itemModel.findAll({
            where: { cart_id: req.params.cart_id },
            include: [{
                model: itemModel,
                attributes: { exclude: ['image'] }  
            }]
        });

        const user = await userModel.findOne({ 
            where: { user_id: cart.user_id },
            attributes: { exclude: ['password', 'email'] } 
        });

        res.json({ success: true, cart, cart_items, user });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'Failed to get cart details' });
    }
};

export { addCart, getCartsByUserId, getCartDetailsByCartId };
