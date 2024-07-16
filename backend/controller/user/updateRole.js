const userModel = require("../../models/userModel");

const updateRoleController = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const updatedData = await userModel.findByIdAndUpdate(userId, { role });

    res.json({
      message: "User updated successfully",
      data: updatedData,
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

module.exports = updateRoleController;
