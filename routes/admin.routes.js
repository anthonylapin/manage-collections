const { Router } = require("express");
const User = require("../models/User");
const { Types } = require("mongoose");
const router = Router();

const userActions = {
  Block: "BLOCK",
  Unblock: "UNBLOCK",
  Admin: "ADMIN",
};

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
});

router.put("/users", async (req, res) => {
  const action = req.query.action;
  const userId = Types.ObjectId(req.body.userId);

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

router.delete("/users", async (req, res) => {
  const userId = Types.ObjectId(req.query.userId);
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

module.exports = router;
