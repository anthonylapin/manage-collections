const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 140,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: Types.ObjectId,
    ref: "Item",
    required: true,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

commentSchema.index({ text: "text" });

module.exports = model("Comment", commentSchema);
