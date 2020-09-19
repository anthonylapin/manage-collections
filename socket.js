const Comment = require("./models/Comment");
const User = require("./models/User");
const Like = require("./models/Like");
const { Types } = require("mongoose");

function handleSocketConnection(io) {
  io.on("connection", (socket) => {
    socket.on("forceDisconnect", function () {
      socket.disconnect();
    });

    socket.on("add comment", async (newComment) => {
      const comment = await createComment(newComment);
      const userId = Types.ObjectId(comment.author);
      const author = await User.findById(userId);

      comment.author = `${author.firstName} ${author.lastName}`;

      io.emit("comment added", {
        ...comment._doc,
        author: `${author.firstName} ${author.lastName}`,
      });
    });

    socket.on("like", async (like) => {
      if (!like.userId) {
        return;
      }

      let returnValue = 1;
      const candidate = await Like.findOne({
        userId: like.userId,
        itemId: like.itemId,
      });

      if (candidate) {
        await candidate.remove();
        returnValue = -1;
      } else {
        const newLike = new Like(like);
        await newLike.save();
      }

      io.emit("like", returnValue);
    });
  });
}

async function createComment(comment) {
  try {
    const newComment = new Comment(comment);
    await newComment.save();
    return newComment;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { handleSocketConnection };
