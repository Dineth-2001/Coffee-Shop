import cart from '../models/cartModel.js';
import deliveryModel from '../models/deliveryModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Add a new delivery
const addDelivery = async (req, res) => {
    const { first_name, last_name, email, street, city, state, zip, phone_num, tot_with_delivery, cart_id, user_id } = req.body;

    if (!first_name || !street || !city || !state || !zip || !phone_num || !tot_with_delivery || !cart_id || !user_id) {
        return res.status(400).json({ success: false, message: 'One or many required fields are missing' });
    }

    const delivery = new deliveryModel({
        first_name,
        last_name,
        email,
        street,
        city,
        state,
        zip,
        phone_num,
        tot_with_delivery,
        cart_id,
        user_id,
        status: 'Pending',
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

// Update the status of the delivery
const updateStatus = async (req, res) => {
    const delivery_id = req.params.delivery_id;
    const { status } = req.body;
    
    console.log(delivery_id, status);

    if (!delivery_id || !status) {
        return res.status(400).json({ success: false, message: 'Delivery ID and status are required' });
    }

    try {
        const delivery = await deliveryModel.findOne({ where: { delivery_id } });

        if (!delivery) {
            return res.status(404).json({ success: false, message: 'Delivery not found' });
        }

        delivery.status = status;
        await delivery.save();

        res.json({ success: true, message: 'Delivery status updated successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Failed to update delivery status' });
    }
};

const placeDelivery = async (req, res) => {
    const frontend_url = "http://localhost5173"

    try {
        const newDelivery = new deliveryModel({
            user_id: req.body.user_id,
            cart_id: req.body.cart_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone_num: req.body.phone_num,
            tot_with_delivery: req.body.tot_with_delivery,
            status: 'Pending',
        })

        await newDelivery.save();
        req.session.cartItems = [];

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "$",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "$",
                product_data: {
                    name: "Delivery Fee"
                },
                unit_amount: 2*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&delivery_id=${newDelivery.delivery_id}`,
            cancel_url: `${frontend_url}/verify?success=false&delivery_id=${newDelivery.delivery_id}`,
        })

        res.json({success:true, session_url:  session.url})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export { addDelivery, getDeliveries, updateStatus, placeDelivery };