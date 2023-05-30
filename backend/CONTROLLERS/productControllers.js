const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER = require("../MODELS/user");
const CART_PRODUCT = require("../MODELS/cartproduct");
const ADMIN_PRODUCT = require("../MODELS/adProduct");

// for admin uploading adProduct to app
const adProductAdd = async (req, res, next) => {
  const { title, price } = req.body;
  try {
    const newAD = new ADMIN_PRODUCT({
      title: title,
      price: parseInt(price),
      image: "uploads/images/" + req.file.filename,
    });

    await newAD.save();
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG...... ");
    error.code = 500;
    return next(error);
  }

  res
    .status(201)
    .json({ message: "Product is successfully added to the app !" });
};

//

const getAdProducts = async (req, res, next) => {
  let products;
  try {
    products = await ADMIN_PRODUCT.find({});
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG...... ");
    error.code = 500;
    return next(error);
  }

  console.log(products);
  res.status(200).json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const addToCart = async (req, res, next) => {
  const { title, price, quantity, image, token } = req.body;

  let isAuthenticated;
  try {
    isAuthenticated = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    const error = new Error("ERROR CONNECTING TO SERVER ");
    error.code = 500;
    return next(error);
  }

  let userId = isAuthenticated.userId;

  let loggedInUser;
  try {
    loggedInUser = await USER.findById(userId);
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG ");
    error.code = 500;
    return next(error);
  }

  if (!loggedInUser) {
    const error = new Error("USER NOT AUTHORIZED , ID INVALID");
    error.code = 401;
    return next(error);
  }

  const newProduct = new CART_PRODUCT({
    title: title,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    image: image,
    userOfProduct: userId,
  });

  loggedInUser.products.push(newProduct);
  await newProduct.save();
  await loggedInUser.save();

  res.status(201).json({ message: "ADDED TO CART SUCCESSFULLY" });
};

const getCart = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  const token = rawToken.split("---")[1];

  let isAuthenticated;
  try {
    isAuthenticated = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    const error = new Error("ERROR CONNECTING TO SERVER ");
    error.code = 500;
    return next(error);
  }

  let userId = isAuthenticated.userId;

  let loggedInUser;
  try {
    loggedInUser = await USER.findById(userId);
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG  FINDING ID ");
    error.code = 500;
    return next(error);
  }

  if (!loggedInUser) {
    const error = new Error("USER NOT AUTHORIZED , ID INVALID");
    error.code = 401;
    return next(error);
  }

  let allCartProducts;
  try {
    allCartProducts = await CART_PRODUCT.find({ userOfProduct: userId });
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG ");
    error.code = 500;
    return next(error);
  }

  res.status(200).json({
    products: allCartProducts.map((item) => item.toObject({ getters: true })),
  });
};

const removeFromCart = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  const productId = req.headers.xproductid;
  const token = rawToken.split("---")[1];

  let isAuthenticated;
  try {
    isAuthenticated = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    const error = new Error("ERROR CONNECTING TO SERVER ");
    error.code = 500;
    return next(error);
  }

  let userId = isAuthenticated.userId;

  let product;
  try {
    product = await CART_PRODUCT.findOne({ _id: productId }).populate(
      "userOfProduct",
    );
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG ");
    error.code = 500;
    return next(error);
  }

  if (userId !== product.userOfProduct.id) {
    const error = new Error("USER NOT AUTHORIZED , ID INVALID");
    error.code = 401;
    return next(error);
  }

  let productToDelete;
  try {
    product.userOfProduct.products.pull(product);
    productToDelete = await PRODUCT.deleteOne({ _id: productId });
    await product.userOfProduct.save();
  } catch (err) {
    const error = new Error("SOMETHING WENT WRONG...... ");
    error.code = 500;
    return next(error);
  }

  res.status(201).json({ message: "PRODUCT SUCCESSFULLY DELETED" });
};

exports.addToCart = addToCart;
exports.getCart = getCart;
exports.removeFromCart = removeFromCart;
exports.adProductAdd = adProductAdd;
exports.getAdProducts = getAdProducts;
