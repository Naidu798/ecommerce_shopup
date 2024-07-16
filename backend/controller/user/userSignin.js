const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateJwtAndSetCookie = require("../../utils/generateJwtAndSetCookie");

const userSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw Error("Please provide email address");
    } else if (!password) {
      throw Error("Please provide password");
    }

    const user = await userModel.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compareSync(
        password,
        user.password
      );
      if (isPasswordCorrect) {
        await generateJwtAndSetCookie(user._id, res);

        res.json({
          message: "login succesfull",
          data: null,
          success: true,
          error: false,
        });
      } else {
        res.json({
          message: "Password is incorrect",
          success: false,
          error: true,
        });
      }
    } else {
      throw Error("User does not exists");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = userSigninController;
