const Comment = require("./models/Comment");
const User = require("./models/User");
const { Types } = require("mongoose");

function handleSocketConnection(io) {
  io.on("connection", (socket) => {
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
