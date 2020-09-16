const { Schema, model, Types } = require("mongoose");

const topicSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  collections: [
    {
      type: Types.ObjectId,
      ref: "Collection",
    },
  ],
});

topicSchema.index({ name: "text" });

module.exports = model("Topic", topicSchema);
