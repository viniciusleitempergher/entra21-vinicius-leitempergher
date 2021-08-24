const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authControllers");

router.post("/tokenlogin", authControllers.tokenlogin);

module.exports = router;