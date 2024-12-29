// import cart_itemModel from '../models/cart_itemModel.js';

// // Add a new cart_item
// const addCartItem = async (req, res) => {
//     try {
//         const cart_item = new cart_itemModel({
//         user_id: req.body.user_id,
//         product_id: req.body.product_id,
//         quantity: req.body.quantity,
//         });
//         await cart_item.save();
//         res.status(201).send(cart_item);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// // Remove a cart_item

// // Get cart items by cart id
// const getCartItemsByCartId = async (req, res) => {
//     try {
//         const cart_items = await cart_itemModel.find({ cart_id: req.params.cart_id });
//         res.status(200).send(cart_items);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// export default { addCartItem, getCartItemsByCartId };

import cart_itemModel from '../models/cart_itemModel.js';

// Add a new cart_item
const addCartItem = async (req, res) => {
    try {
        const cart_item = new cart_itemModel({
            cart_id: req.body.cart_id,
            item_id: req.body.item_id,
            quantity: req.body.quantity,
            sub_total: req.body.sub_total,
        });
        await cart_item.save();
        res.json({success: true, message: 'Cart item added successfully'})
    } catch (error) {
        res.json({success: false, message: 'Failed to add cart item'})
    }
};

// Get cart items by cart id
const getCartItemsByCartId = async (req, res) => {
    try {
        const cart_items = await cart_itemModel.findAll({ where: { cart_id: req.params.cart_id } });
        res.status(200).send(cart_items);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { addCartItem, getCartItemsByCartId };
