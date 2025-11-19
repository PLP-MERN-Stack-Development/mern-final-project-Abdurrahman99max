// Server/src/utils/generateToken.js
const jwt = require("jsonwebtoken");

function generateToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

module.exports = generateToken;
