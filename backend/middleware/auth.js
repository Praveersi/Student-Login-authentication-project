const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, denied" });
  }

  try {
    // 🔥 HANDLE BOTH CASES
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, "secret123");

    req.user = { id: decoded.id };

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};