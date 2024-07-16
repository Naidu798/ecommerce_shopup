const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

const userSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    if (!email) {
      throw new Error("Please provide email");
    } else if (!password) {
      throw new Error("Please provide password");
    } else if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashedPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    saveUser.password = null;

    res.status(201).json({
      data: saveUser,
      message: "User created successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignupController;
