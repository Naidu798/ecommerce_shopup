const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

const updatePasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw Error("Email does not exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    user.password = hashedPassword;

    const saveUser = await user.save();
    saveUser.password = null;

    res.json({
      message: "Password changed successfully",
      data: saveUser,
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

module.exports = updatePasswordController;
