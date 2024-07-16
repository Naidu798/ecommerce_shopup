const cartModel = require("../../models/cartModel");

const deleteCartProductController = async (req, res) => {
  try {
    const { _id } = req.body;

    const cartItem = await cartModel.deleteOne({ _id });

    res.json({
      message: "product deleted successfull",
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

module.exports = deleteCartProductController;
