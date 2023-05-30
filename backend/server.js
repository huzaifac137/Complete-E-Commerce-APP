const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const webhook = require("./CONTROLLERS/stripeWebhook");
require("dotenv").config();
const path = require("path");
const app = express();

app.post("/webhooks", express.raw({ type: "application/json" }), webhook);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(morgan("dev"));

const userRoutes = require("./ROUTES/userRoutes");
const productRoutes = require("./ROUTES/productRoutes");
const paymentRoutes = require("./ROUTES/paymentRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "SOMETHING WENT WRONG" });
});

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "COULD NOT FIND THIS ROUTE" });
  return next();
});

try {
  mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
  });

  app.listen(process.env.PORT || 5000);
} catch (error) {
  console.log(error);
}

console.log("CONNECTED TO DATABASE ");
console.log("APP RUNNING");
