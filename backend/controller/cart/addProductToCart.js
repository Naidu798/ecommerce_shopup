const cartModel = require("../../models/cartModel");

const addProductToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const isAlreadyAdded = await cartModel.findOne({
      $and: [
        {
          productId,
        },
        {
          userId,
        },
      ],
    });
    if (isAlreadyAdded) {
      throw Error("Product already added !");
    }

    const payload = {
      productId,
      userId,
      quantity: 1,
    };

    const cartProduct = new cartModel(payload);
    const data = await cartProduct.save();

    res.json({
      message: "Product successfully added to the cart.",
      data,
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

module.exports = addProductToCart;
