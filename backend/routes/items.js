const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");


// ➕ ADD ITEM
router.post("/", auth, async (req, res) => {
  try {
    const item = new Item({
      userId: req.user.id,
      ...req.body
    });

    await item.save();
    res.json({ msg: "Item added", item });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 📥 GET ALL ITEMS
router.get("/", auth, async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  res.json(items);
});


// 🔍 GET BY ID
router.get("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});


// ✏️ UPDATE ITEM
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.userId !== req.user.id) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});


// ❌ DELETE ITEM
router.delete("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.userId !== req.user.id) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  await item.deleteOne();
  res.json({ msg: "Item deleted" });
});


// 🔎 SEARCH
router.get("/search/:name", auth, async (req, res) => {
  const items = await Item.find({
    name: { $regex: req.params.name, $options: "i" }
  });

  res.json(items);
});

module.exports = router;