const productModel = require("../../models/productModel");

const filterProductsController = async (req, res) => {
  try {
    const { categoryList } = req.body;
    const products = await productModel.find({
      category: {
        $in: categoryList || [],
      },
    });

    res.json({
      message: "Products fetched successfully",
      data: products,
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

module.exports = filterProductsController;
