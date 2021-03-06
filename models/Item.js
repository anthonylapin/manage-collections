const { Schema, model, Types } = require("mongoose");

const itemSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [
    {
      type: Types.ObjectId,
      ref: "Tag",
    },
  ],
  collectionId: {
    type: Types.ObjectId,
    ref: "Collection",
    required: true,
  },
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

itemSchema.index({ "$**": "text" });

module.exports = model("Item", itemSchema);
