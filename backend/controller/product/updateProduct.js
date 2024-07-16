const productModel = require("../../models/productModel");

const updateProductController = async (req, res) => {
  try {
    const { _id, ...resBody } = req.body;

    const productData = await productModel.findByIdAndUpdate(_id, resBody);

    res.status(200).json({
      message: "Product updated successfully",
      data: productData,
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

module.exports = updateProductController;
