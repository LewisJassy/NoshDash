import userModel from './../models/userModel.js';
import { validationResult } from 'express-validator'; // For input validation

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
        }

        const { userId, itemId } = req.body;

        // Fetch user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if undefined

        // Add or increment item in the cart
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        // Update user cart atomically to avoid race conditions
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        return res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
        }

        const { userId, itemId } = req.body;

        // Fetch user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            // Remove item if quantity reaches 0
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

            await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
            return res.json({ success: true, message: 'Removed from cart' });
        } else {
            return res.status(400).json({ success: false, message: 'Item not in cart or invalid quantity' });
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
        }

        // Fetch user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData || {}; // Initialize cartData if undefined
        return res.json({ success: true, cartData });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { addToCart, removeFromCart, getCart };
