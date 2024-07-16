const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  brandName: String,
  category: String,
  productImages: [],
  price: Number,
  sellingPrice: Number,
  description: String,
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
