const productModel = require("../../models/productModel");

const uploadProductController = async (req, res) => {
  try {
    const productData = new productModel(req.body);
    const saveProduct = await productData.save();

    res.status(200).json({
      message: "Product uploaded successfully",
      data: saveProduct,
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

module.exports = uploadProductController;
