const { Router } = require("express");
const { Types } = require("mongoose");
const Like = require("../models/Like");

const router = Router();

router.get("/:itemId", async (req, res) => {
  const itemId = Types.ObjectId(req.params.itemId);
  try {
    const likes = await Like.find({ itemId });
    res.json({ likes: likes.length });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

module.exports = router;
