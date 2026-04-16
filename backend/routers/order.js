const express = require("express");
const routerOrder = express.Router();
const auth = require("../middlewares/auth"); 
const { createOrder, verifyPayment , getMyOrders, getOrderById, getAllOrders} = require("../controllers/order");

routerOrder.post("/create", auth, createOrder);
routerOrder.post("/verify", auth, verifyPayment);
routerOrder.get("/my-orders", auth, getMyOrders);
routerOrder.get("/all", auth, getAllOrders);
routerOrder.get("/:id", auth, getOrderById); 


module.exports = routerOrder;