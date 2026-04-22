const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
 const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, denied" });
  }

  try {
    // 🔥 FIX: remove "Bearer " if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;

    next();

  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Invalid token" });
  }
};

  if (!token) return res.status(401).json({ msg: "No token, denied" });

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = { id: decoded.id }; // 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};