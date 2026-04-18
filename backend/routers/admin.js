const express = require("express");

const {getAdmin, getByIdAdmin, updateAdmin, updateflagAdmin, loginAdmin, signUpAdmin,deleteAdmin} = require("../controllers/admin");
const routerAdmin = express.Router();
const {uploadsAdmin} = require("../middlewares/upload");

routerAdmin.get("/", getAdmin);
// routerAdmin.post("/create", /uploadsAdmin.single("image"), postAdmin);
routerAdmin.get("/fetch/:id", getByIdAdmin);
routerAdmin.put("/update/:id", updateAdmin);
routerAdmin.put("/:flag/:id", updateflagAdmin);
routerAdmin.post("/login", loginAdmin);
routerAdmin.post("/sign", uploadsAdmin.single("image"), signUpAdmin);
routerAdmin.delete("/delete/:id", deleteAdmin)

module.exports = routerAdmin;
