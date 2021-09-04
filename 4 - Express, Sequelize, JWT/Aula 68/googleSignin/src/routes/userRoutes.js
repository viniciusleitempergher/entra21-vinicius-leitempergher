const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const userControllers = require("../controllers/userController")

router.post("/userinfo", authentication(["user"]), userControllers.showUserInfo);

module.exports = router;