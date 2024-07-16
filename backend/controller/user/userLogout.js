const userModel = require("../../models/userModel");

const userLogoutController = async (req, res) => {
  try {
    const token = req.cookies.ecommerce_token;
    const userId = req.user._id;
    if (!token) {
      throw Error("Token not found");
    }
    const user = await userModel.findById(userId);
    if (!user) {
      throw Error("User not found");
    }

    res.cookie("ecommerce_token", "");

    res.json({
      message: "Logout successfully",
      data: null,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

module.exports = userLogoutController;
