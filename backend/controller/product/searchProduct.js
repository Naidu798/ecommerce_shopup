const productModel = require("../../models/productModel");

const searchProductController = async (req, res) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(query, "i", "g");

    const serachProducts = await productModel.find({
      $or: [
        {
          category: regex,
        },
        {
          productName: regex,
        },
      ],
    });

    res.json({
      message: "Products fetched successfully",
      data: serachProducts,
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

module.exports = searchProductController;
