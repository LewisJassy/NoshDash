import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';
import Stripe from "stripe";
import { io } from '../server.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5173';
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Emit real-time order placed event
        io.emit(`user_${req.body.userId}_orders`, { 
            action: 'new_order', 
            order: newOrder 
        });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 300
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == 'true') {
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId, 
                { payment: true },
                { new: true }
            );
            
            // Emit payment successful event
            io.to(`order_${orderId}`).emit('order_updated', {
                action: 'payment_successful',
                order: updatedOrder
            });
            
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            
            // Emit payment failed event
            io.to(`order_${orderId}`).emit('order_updated', {
                action: 'payment_failed',
                orderId: orderId
            });
            
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.body.orderId, 
            { status: req.body.status },
            { new: true }
        );
        
        // Emit order status update event
        io.to(`order_${req.body.orderId}`).emit('order_updated', {
            action: 'status_updated',
            order: updatedOrder
        });
        
        // Also notify the user directly
        io.emit(`user_${updatedOrder.userId}_orders`, {
            action: 'status_updated',
            order: updatedOrder
        });
        
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };