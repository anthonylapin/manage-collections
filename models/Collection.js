const { Schema, model, Types } = require("mongoose");

const collectionSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  items: [
    {
      type: Types.ObjectId,
      ref: "Item",
    },
  ],
  numericField1: {
    type: String,
    trim: true,
  },
  numericField2: {
    type: String,
    trim: true,
  },
  numericField3: {
    type: String,
    trim: true,
  },
  oneLineField1: {
    type: String,
    trim: true,
  },
  oneLineField2: {
    type: String,
    trim: true,
  },
  oneLineField3: {
    type: String,
    trim: true,
  },
  textField1: {
    type: String,
    trim: true,
  },
  textField2: {
    type: String,
    trim: true,
  },
  textField3: {
    type: String,
    trim: true,
  },
  dateField1: {
    type: String,
    trim: true,
  },
  dateField2: {
    type: String,
    trim: true,
  },
  dateField3: {
    type: String,
    trim: true,
  },
  checkboxField1: {
    type: String,
    trim: true,
  },
  checkboxField2: {
    type: String,
    trim: true,
  },
  checkboxField3: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

collectionSchema.index({ "$**": "text" });

module.exports = model("Collection", collectionSchema);
