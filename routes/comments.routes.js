const { Router } = require("express");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { Types } = require("mongoose");

const router = Router();

router.get("/:itemId", async (req, res) => {
  const itemId = Types.ObjectId(req.params.itemId);
  try {
    const comments = await Comment.find({ itemId });
    const userIds = comments.map((comment) => comment.author);
    const authors = await User.find({ _id: { $in: userIds } });

    const modifiedComments = comments.map((comment) => {
      const author = authors.find(
        (author) => String(comment.author) === String(author._id)
      );
      return {
        ...comment._doc,
        author: `${author.firstName} ${author.lastName}`,
      };
    });

    res.json({
      comments: modifiedComments,
    });
  } catch (e) {
    console.log("Error", e.message);
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

module.exports = router;
