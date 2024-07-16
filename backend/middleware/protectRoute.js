const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.ecommerce_token;
    if (!token) {
      throw Error("You need to login first.");
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decoded) {
      throw Error("Unauthorized: Invalid token");
    }
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      throw Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.json({
      message: err.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

module.exports = protectRoute;
