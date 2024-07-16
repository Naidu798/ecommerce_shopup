const productModel = require("../../models/productModel");

const categoryProductsController = async (req, res) => {
  try {
    const { category } = req.query;

    const categoryProducts = await productModel.find({ category });

    res.status(200).json({
      message: "products fetched successfully",
      data: categoryProducts,
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

module.exports = categoryProductsController;
