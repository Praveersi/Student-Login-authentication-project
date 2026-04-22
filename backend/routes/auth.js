const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const auth = require("../middleware/auth");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    if (!name || !email || !password || !course) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let user = await Student.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    user = new Student({ name, email, password: hashed, course });
    await user.save();

    res.json({ msg: "Registered Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});


// ================= GET USER =================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= UPDATE PASSWORD =================
router.put("/update-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Student.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: "Password updated" });

  } catch (err) {
    res.status(500).json({ msg: "Error updating password" });
  }
});


// ================= UPDATE COURSE =================
router.put("/update-course", auth, async (req, res) => {
  try {
    const { course } = req.body;

    const user = await Student.findById(req.user.id);
    user.course = course;
    await user.save();

    res.json({ msg: "Course updated" });

  } catch (err) {
    res.status(500).json({ msg: "Error updating course" });
  }
});


module.exports = router;