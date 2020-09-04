const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const Tag = require("../models/Tag");
const Item = require("../models/Item");
const { Types } = require("mongoose");

const router = Router();

router.post("/create", auth, async (req, res) => {
  const createdTags = await createTags(req.body.tags);

  const newItem = new Item({
    ...req.body,
    collectionId: Types.ObjectId(req.body.collection),
    tags: createdTags,
  });

  await newItem.save();

  res.status(201).json({
    message: "New item is created!",
  });
});

async function createTags(tags) {
  let foundTags = await Tag.find({ name: { $in: tags } });
  const foundTagsNames = foundTags.map((tag) => tag.name);

  const tagsToCreate = tags.filter((tag) => !foundTagsNames.includes(tag));
  if (!tagsToCreate.length) {
    return foundTags;
  }

  const tagsDocuments = tagsToCreate.map((tag) => ({ name: tag }));
  let insertedTags = await Tag.insertMany(tagsDocuments);

  return [
    ...foundTags.map((tag) => tag._id),
    ...insertedTags.map((tag) => tag._id),
  ];
}

module.exports = router;
