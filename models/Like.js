const { Schema, Types, model } = require("mongoose");

const likeSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: Types.ObjectId,
    ref: "Item",
    required: true,
  },
});

module.exports = model("Like", likeSchema);
