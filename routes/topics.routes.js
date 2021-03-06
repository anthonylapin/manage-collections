const { Router } = require("express");
const { Types } = require("mongoose");
const { check, validationResult } = require("express-validator");
const Topic = require("../models/Topic");
const { capitalizeWords } = require("../helper");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find({});
    const topicsInfo = topics.map((topic) => {
      return {
        id: topic.id,
        name: topic.name,
      };
    });
    res.status(200).json({
      message: "Topics successfully found",
      topics: topicsInfo,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const topicId = Types.ObjectId(req.params.id);
    const topic = await Topic.findById(topicId);

    res.json({
      topic,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.post(
  "/create",
  [
    check("name", "Name must exist.").exists().isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data during creating new topic.",
      });
    }

    try {
      const { name } = req.body;
      const capitalizedName = capitalizeWords(name);

      const candidate = await Topic.findOne({ name: capitalizedName });
      if (candidate) {
        return res.status(400).json({
          message: "Such topic already exists, choose different name.",
        });
      }

      await createTopic(capitalizedName);
      res.status(201).json({
        message: `Topic ${capitalizedName} is created.`,
      });
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong, try again.",
      });
    }
  }
);

async function createTopic(name) {
  const newTopic = new Topic({ name });
  await newTopic.save();
  return newTopic;
}

module.exports = router;
