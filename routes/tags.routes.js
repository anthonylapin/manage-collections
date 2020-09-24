const { Router } = require("express");
const Tag = require("../models/Tag");
const { Types } = require("mongoose");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let tags = await Tag.find({});

    if (!req.query.withId) {
      tags = tags.map((tag) => tag.name);
    }
    res.json({
      tags,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const itemId = Types.ObjectId(req.params.itemId);
    let foundTags = await Tag.find({
      items: [itemId],
    });

    foundTags = foundTags.map((tag) => tag.name);

    res.json({
      foundTags,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

module.exports = router;
