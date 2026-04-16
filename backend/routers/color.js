const express = require("express");
const {
  getColor,
  postColor,
  getAPIColor,
  updateColor,
  updateflag,
  deleteColor
} = require("../controllers/color");

const { uploadCategory} = require("../middlewares/upload"); 

const routercolor = express.Router();
routercolor.get("/", getColor);
routercolor.get("/fetch/:id", getAPIColor);
routercolor.post("/create", uploadCategory.single("image"), postColor);
routercolor.put("/update/:id", uploadCategory.single("image"), updateColor); 
routercolor.put("/:flag/:id", updateflag);
routercolor.delete("/delete/:id", deleteColor);

module.exports = routercolor;
