const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../models/order");
const CartModel = require("../models/cart");
require("../models/product"); // Populate ke liye zaroori hai

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- 1. ADMIN ONLY: Sabke orders fetch karna ---
const getAllOrders = async (req, res) => {
    try {
        // Double Check: Sirf admin hi access kare
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Unauthorized: Admin access required" });
        }

        const orders = await OrderModel.find({})
            .populate("userId", "name email")
            .populate("items.productId", "name thumbnail price")
            .sort({ createdAt: -1 });
        
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 2. USER ONLY: Apne khud ke orders dekhna ---
const getMyOrders = async (req, res) => {
    try {
        // find({ userId: req.user.id }) hi fix hai aapki privacy problem ka
        const orders = await OrderModel.find({ userId: req.user.id })
            .populate("items.productId", "name thumbnail price")
            .sort({ createdAt: -1 }); 

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 3. SINGLE ORDER: ID se order dhundna (Security included) ---
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params; 
        const order = await OrderModel.findById(id)
            .populate('items.productId')
            .populate('userId', 'name email');

        if (!order) {
            return res.status(404).json({ success: false, message: "Order nahi mila" });
        }

        // Security check: Order usi ka hona chahiye jo mang raha hai, ya fir Admin ho
        if (order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- 4. VERIFY & SAVE: Payment verify karke order create karna ---
const verifyPayment = async (req, res) => {
    try {
        const { cartItems, address, amount, paymentMethod, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Razorpay signature verification
        if (paymentMethod === "Online") {
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                return res.status(400).json({ success: false, message: "Transaction tampered!" });
            }
        }

        const formattedItems = cartItems.map(item => ({
            productId: item.productId?._id || item.productId,
            qty: item.qty,
            price: item.productId?.final_price || item.price || 0
        }));

        const newOrder = new OrderModel({
            userId: req.user.id, // Auth middleware se user ID
            items: formattedItems,
            amount,
            address,
            paymentId: razorpay_payment_id || "COD_" + Date.now(),
            orderId: razorpay_order_id || "ORD_" + Date.now(),
            status: paymentMethod === "Online" ? "Paid" : "Pending",
            paymentMethod
        });

        await newOrder.save();
        
        // Cart clear karna order ke baad
        await CartModel.deleteMany({ userId: req.user.id });

        res.json({ success: true, message: "Order Successful" });
    } catch (err) {
        console.error("Order Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Create Razorpay Order logic
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Math.round(amount * 100), 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, verifyPayment, getMyOrders, getOrderById, getAllOrders };