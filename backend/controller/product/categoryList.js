const productModel = require("../../models/productModel");

const categoryListController = async (req, res) => {
  try {
    const categories = await productModel.distinct("category");

    const categoryProducts = [];
    for (let category of categories) {
      const product = await productModel.findOne({ category });
      if (product) {
        categoryProducts.push(product);
      }
    }

    res.status(200).json({
      message: "Product categories fetched successfully",
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

module.exports = categoryListController;
