const productModel = require("../../models/productModel");

const allProductsController = async (req, res) => {
  try {
    const allProducts = await productModel.find();
    if (!allProducts) {
      throw Error("Something went wrong!");
    }

    res.json({
      message: "Products fetched successfully",
      data: allProducts,
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

module.exports = allProductsController;
