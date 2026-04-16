const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", 
        required: true
    },
    qty: {
        type: Number,
        default: 1,
        required: true,
        min: 1
    }
},
{
    timestamps: true
}
);

CartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;