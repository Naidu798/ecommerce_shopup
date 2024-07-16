const userModel = require("../../models/userModel");

const allUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      throw Error("Something went wrong!");
    }

    res.json({
      message: "Users fetched successfully",
      data: users,
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

module.exports = allUsersController;
