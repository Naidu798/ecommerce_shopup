const userModel = require("../../models/userModel");

const getUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (user) {
      res.json({
        message: "User fetched succeefully",
        data: user,
        success: true,
        error: false,
      });
    } else {
      throw Error("User not found");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = getUserController;
