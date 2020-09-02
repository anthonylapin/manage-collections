const { Router } = require("express");
const Tag = require("../models/Tag");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.json({
      tags,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

module.exports = router;