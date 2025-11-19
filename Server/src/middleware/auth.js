// Server/src/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  try {
    let token;

    // Try cookie first
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // Then Authorization header
    if (!token && req.headers.authorization) {
      const [scheme, value] = req.headers.authorization.split(" ");
      if (scheme === "Bearer" && value) token = value;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ success: false, message: "Not authorized" });
  }
}

module.exports = { protect };
