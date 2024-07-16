const jwt = require("jsonwebtoken");

const generateJwtAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.PRIVATE_KEY, {
    expiresIn: "15d",
  });

  if (!token) {
    throw Error("Internal server error");
  }

  res.cookie("ecommerce_token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

module.exports = generateJwtAndSetCookie;
