require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routerCate = require("./routers/category");
const routerPro = require("./routers/product");
const routerBrand = require("./routers/brand");
const routercolor = require("./routers/color");
const routerUser = require("./routers/user");
const routerAdmin = require("./routers/admin");
const router = require("./routers/cart");
const routerOrder = require("./routers/order");

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:10000",
    "https://swoo-tech-mart-n1c5.vercel.app"
  ],
  credentials: true
}));
app.use("/category", routerCate);
app.use("/product", routerPro);
app.use("/brand", routerBrand);
app.use("/color", routercolor);
app.use("/user", routerUser);
app.use("/admin", routerAdmin);
app.use("/cart", router);
app.use("/order", routerOrder);
app.use("/uploads/category", express.static("Public/category"));
app.use("/uploads/product", express.static("Public/products"));
app.use("/uploads/brand", express.static("Public/brand"));
app.use("/uploads/user", express.static("Public/user"));
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed");
    console.error(error.message);
  });
