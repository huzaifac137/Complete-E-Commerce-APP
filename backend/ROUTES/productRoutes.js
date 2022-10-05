const express = require("express");
const addToCart = require("../CONTROLLERS/productControllers").addToCart;
const getCart = require("../CONTROLLERS/productControllers").getCart;
const removeFromCart = require("../CONTROLLERS/productControllers").removeFromCart;

const router = express.Router();

router.get("/" , getCart);
router.post("/add" , addToCart);
router.delete("/remove" ,removeFromCart );


module.exports = router;