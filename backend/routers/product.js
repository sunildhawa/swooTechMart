const express = require("express");
const {
  getPro,
  postPro,
  getAPIPro,
  updatePro,
  updateFlag,
  deletePro,
  addOtherImages
} = require("../controllers/product");

const { uploadProduct } = require("../middlewares/upload");
const {uploadsOther} = require("../middlewares/upload")
const routerPro = express.Router();

routerPro.get("/", getPro);
routerPro.get("/fetch/:id", getAPIPro);
routerPro.post("/create", uploadProduct.single("thumbnail"), postPro);
routerPro.post("/otherImageAdd/:id", uploadsOther.array("images",10), addOtherImages)
routerPro.put("/update/:id", uploadProduct.single("thumbnail"), updatePro);
routerPro.put("/:flag/:id", updateFlag);
routerPro.delete("/delete/:id", deletePro);

module.exports = routerPro;
