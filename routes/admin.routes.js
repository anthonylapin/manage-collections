const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Topic = require("../models/Topic");
const { Types } = require("mongoose");
const { capitalizeWords } = require("../helper");
const router = Router();

const userActions = {
  Block: "BLOCK",
  Unblock: "UNBLOCK",
  Admin: "ADMIN",
};

router.get("/users", async (req, res) => {
  try {
    let users = await User.find({});

    // users = users.map((user) => ({
    //   _id: user._id,
    //   name: `${user.firstName} ${user.lastName}`,
    // }));

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
});

router.put("/users/:userId", async (req, res) => {
  const action = req.query.action;
  const userId = Types.ObjectId(req.params.userId);

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "No such user exists",
      });
    }

    let key,
      value = true;

    switch (action) {
      case userActions.Block:
        key = "blocked";
        break;
      case userActions.Unblock:
        key = "blocked";
        value = false;
        break;
      case userActions.Admin:
        key = "superuser";
        break;
      default:
        key = null;
        break;
    }

    if (!key) {
      return res.status(400).json({
        message: "Wrong action",
      });
    }

    user[key] = value;
    await user.save();

    res.json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
});

router.delete("/users/:userId", async (req, res) => {
  const userId = Types.ObjectId(req.params.userId);
  try {
    await User.deleteOne({ _id: userId });
    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
});

router.post(
  "/topics",
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

router.put("/topics/:topicId", async (req, res) => {
  const topicId = Types.ObjectId(req.params.topicId);
  try {
    await Topic.updateOne(
      { _id: topicId },
      { name: capitalizeWords(req.body.name) }
    );
    res.status(200).json({
      message: "Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.delete("/topics/:topicId", async (req, res) => {
  const topicId = Types.ObjectId(req.params.topicId);
  try {
    await Topic.deleteOne({ _id: topicId });
    res.status(200).json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

async function createTopic(name) {
  const newTopic = new Topic({ name });
  await newTopic.save();
  return newTopic;
}

module.exports = router;
