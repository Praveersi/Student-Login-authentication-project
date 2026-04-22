const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// DEBUG
console.log("SERVER RUNNING");

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 IMPORT ROUTES PROPERLY
const authRoutes = require("./routes/auth");

// DEBUG ROUTE
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// 🔥 USE ROUTES
app.use("/api", authRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));