const mongoose = require("mongoose");
const CartModel = require("../models/cart");
const { sendServerError, success, created } = require("../utils/helpers");


const getCart = async (req, res) => {
  try {

    const data = await CartModel
      .find()
      .populate("userId")
      .populate("productId");

    return success(res, "Cart fetched successfully", data);

  } catch (err) {
    return sendServerError(res, err);
  }
};

const postCart = async (req, res) => {
  try {

    const userId = req.user.id; 
    const { productId, qty } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: false,
        message: "productId is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid productId"
      });
    }

    const existingCart = await CartModel.findOne({ userId, productId });

    if (existingCart) {

      existingCart.qty += qty ? Number(qty) : 1;

      await existingCart.save();

      return success(res, "Cart updated successfully", existingCart);
    }

    const newCart = await CartModel.create({
      userId,
      productId,
      qty: qty ? Number(qty) : 1
    });

    return created(res, "Cart created successfully", newCart);

  } catch (err) {
    return sendServerError(res, err);
  }
};

const getUserCart = async (req, res) => {
  try {

    const userId = req.user.id;

    const cart = await CartModel
      .find({ userId })
      .populate("productId");

    return success(res, "Cart fetched successfully", cart);

  } catch (err) {
    return sendServerError(res, err);
  }
};

const updateQty = async (req, res) => {
  try {

    const cartId = req.params.id;
    const { qty } = req.body;

    if (!qty || qty < 1) {
      return res.status(400).json({
        status: false,
        message: "Valid qty required"
      });
    }

    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart item not found"
      });
    }

    cart.qty = Number(qty);

    await cart.save();

    return success(res, "Quantity updated successfully", cart);

  } catch (err) {
    return sendServerError(res, err);
  }
};



const removeCart = async (req, res) => {
  try {

    const cartId = req.params.id;

    const deleted = await CartModel.findByIdAndDelete(cartId);

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Cart item not found"
      });
    }

    return success(res, "Cart item removed successfully", []);

  } catch (err) {
    return sendServerError(res, err);
  }
};



const clearCart = async (req, res) => {
  try {

    const userId = req.user.id;

    await CartModel.deleteMany({ userId });

    return success(res, "Cart cleared successfully", []);

  } catch (err) {
    return sendServerError(res, err);
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const { id } = req.params; 

    const data = await CartModel
      .find({ userId: id }) 
      .populate("userId")
      .populate("productId");

    return success(res, "User's cart fetched successfully", data);
  } catch (err) {
    return sendServerError(res, err);
  }
};

module.exports = {
  getCart,
  postCart,
  getUserCart,
  updateQty,
  removeCart,
  clearCart,
  getCartByUserId
};