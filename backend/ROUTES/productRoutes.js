const express = require("express");
const {
  adProductAdd,
  getAdProducts,
} = require("../CONTROLLERS/productControllers");
const addToCart = require("../CONTROLLERS/productControllers").addToCart;
const getCart = require("../CONTROLLERS/productControllers").getCart;
const removeFromCart =
  require("../CONTROLLERS/productControllers").removeFromCart;

const imageUploader = require("../UPLOADER/imageUploader");

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart);
router.get("/getads", getAdProducts);

// admin

router.post("/admin/postkrdead", imageUploader.single("file"), adProductAdd);

module.exports = router;
