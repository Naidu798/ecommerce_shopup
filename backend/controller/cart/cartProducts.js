const cartModel = require("../../models/cartModel");

const cartProductsController = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartProducts = await cartModel.find({ userId }).populate("productId");

    res.json({
      message: "Products fetched successfully.",
      data: cartProducts,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = cartProductsController;
