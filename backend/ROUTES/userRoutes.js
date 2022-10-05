const express = require("express");
const login = require("../CONTROLLERS/userControllers").login;
const signup = require("../CONTROLLERS/userControllers").signup;

const router = express.Router();

router.post("/signup" ,signup);
router.post("/login" , login);

module.exports = router;