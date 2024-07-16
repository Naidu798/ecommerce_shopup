const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    ref: "products",
    type: String,
  },
  quantity: Number,
  userId: String,
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
