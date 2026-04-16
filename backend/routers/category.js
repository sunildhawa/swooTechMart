const express = require("express");
const {
  getCate,
  postCate,
  updateCate,
  deleteCate,
  updateflag,
  getAPICate
} = require("../controllers/category");

const { uploadCategory } = require("../middlewares/upload");

const routerCate = express.Router();

routerCate.get("/", getCate);
routerCate.get("/fetch/:id", getAPICate);
routerCate.post("/create", uploadCategory.single("image"), postCate);
routerCate.put("/update/:id", uploadCategory.single("image"), updateCate);
routerCate.delete("/delete/:id", deleteCate);
routerCate.put("/:flag/:id", updateflag);

module.exports = routerCate;
