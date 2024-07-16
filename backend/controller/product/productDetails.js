const productModel = require("../../models/productModel");

const productDetailsController = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetails = await productModel.findById(productId);
    if (!productDetails) {
      throw Error("Something went wrong!");
    }

    res.json({
      message: "Product details fetched successfully",
      data: productDetails,
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

module.exports = productDetailsController;
