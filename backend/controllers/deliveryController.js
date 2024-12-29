import deliveryModel from '../models/deliveryModel.js';

// Add a new delivery
const addDelivery = async (req, res) => {
    const { street, city, state, zip, phone_num, tot_with_delivery, cart_id, user_id } = req.body;

    if (!street || !city || !state || !zip || !phone_num || !tot_with_delivery || !cart_id || !user_id) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const delivery = new deliveryModel({
        street,
        city,
        state,
        zip,
        phone_num,
        tot_with_delivery,
        cart_id,
        user_id
    });
    
    try {
        await delivery.save()
        res.json({success: true, message: 'Delivery added successfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Failed to add delivery'})
    }
};

// Get all deliveries
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await deliveryModel.findAll();
        res.json(deliveries);
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Failed to get deliveries'})
    }
};

export { addDelivery, getDeliveries };