const express = require("express");

const stripePayment = require("../CONTROLLERS/paymentControllers").stripePayment;


const router = express.Router();

router.post("/", stripePayment);

module.exports = router;