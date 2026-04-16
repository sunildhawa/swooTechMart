const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        qty: Number,
        price: Number
    }],
    amount: Number,
    address: String,
    paymentId: String,
    orderId: String,
    paymentMethod: String,   
    status: { type: String, default: 'Pending' }
}, { timestamps: true });    
module.exports = mongoose.model("order", orderSchema);