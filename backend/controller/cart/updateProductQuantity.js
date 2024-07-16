const cartModel = require("../../models/cartModel");

const updateProductQuantity = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    const cartItem = await cartModel.updateOne(
      { _id: cartItemId },
      {
        quantity,
      }
    );

    res.json({
      message: "Product qunatity updated successfully",
      data: cartItem,
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

module.exports = updateProductQuantity;
