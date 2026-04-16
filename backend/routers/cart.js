const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  getCart,
  postCart,
  getUserCart,
  getCartByUserId, 
  updateQty,
  removeCart,
  clearCart
} = require("../controllers/cart");


router.get("/", auth, getCart);
router.get("/user/:id", getCartByUserId); 
router.post("/", auth, postCart);
router.get("/my-cart", auth, getUserCart);
router.put("/:id", auth, updateQty);
router.delete("/:id", auth, removeCart);
router.delete("/clear", auth, clearCart);

module.exports = router;