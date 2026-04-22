const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "No token, denied" });

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = { id: decoded.id }; // 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};