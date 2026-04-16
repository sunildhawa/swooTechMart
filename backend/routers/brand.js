const express = require("express");
const {
  getBrand,
  postBrand,
  getAPIBrand,
  updateBrand,
  updateflag,
  deleteBrand
} = require("../controllers/brand");

const { uploadBrand } = require("../middlewares/upload");

const routerBrand = express.Router();

routerBrand.get("/", getBrand);
routerBrand.get("/:id", getAPIBrand);
routerBrand.post("/create", uploadBrand.single("image"), postBrand);
routerBrand.put("/update/:id", uploadBrand.single("image"), updateBrand);
routerBrand.put("/:flag/:id", updateflag);
routerBrand.delete("/delete/:id", deleteBrand);

module.exports = routerBrand;
