const express = require("express");
const {getUser, getAPIUser, postUser, updateUser, updateFlagUser, deleteUser,signup,login} = require("../controllers/user")
const routerUser = express.Router();
const {uploadsUser} = require("../middlewares/upload");

routerUser.get("/", getUser);
routerUser.get("/fetch/:id", getAPIUser);
routerUser.post("/create", uploadsUser.single("profilePic"), postUser);
routerUser.put("/update/:id", uploadsUser.single("profilePic"), updateUser);
routerUser.put("/:flag/:id", updateFlagUser);
routerUser.delete("/delete/:id", deleteUser);
routerUser.post("/signup", signup);
routerUser.post("/login", login);


module.exports = routerUser;