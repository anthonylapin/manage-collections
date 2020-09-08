const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const Tag = require("../models/Tag");
const Item = require("../models/Item");
const { Types } = require("mongoose");

const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      collectionId: Types.ObjectId(req.body.collectionId),
      tags: [],
    });
    await newItem.save();

    await addItemsToTags(req.body.tags, newItem._id);
    await createNewTags(req.body.tags, newItem._id);

    res.status(201).json({
      message: "New item is created!",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.get("/:collectionId", async (req, res) => {
  try {
    const collectionId = req.params.collectionId;
    const foundItems = await Item.find({
      collectionId,
    });
    res.json({ foundItems });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const item = req.body.item;
  const itemId = Types.ObjectId(req.params.id);
  try {
    const response = await Item.updateOne(
      { _id: itemId },
      { $set: { ...item, tags: [] } }
    );

    await updateTags(item.tags, itemId);

    res.json({
      message: "Updated",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

async function updateTags(tags, itemId) {
  await deleteItemsFromTags(tags, itemId);
  await addItemsToTags(tags, itemId);
  await createNewTags(tags, itemId);
}

async function addItemsToTags(tags, itemId) {
  await Tag.updateMany(
    { name: { $in: tags } },
    { $addToSet: { items: [itemId] } }
  );
}

async function deleteItemsFromTags(tags, itemId) {
  await Tag.updateMany(
    { items: [itemId], name: { $nin: tags } },
    { $pullAll: { items: [itemId] } }
  );
}

async function createNewTags(tags, itemId) {
  let foundTags = await Tag.find({ name: { $in: tags } });
  const foundTagsNames = foundTags.map((tag) => tag.name);
  const tagsToCreate = tags.filter((tag) => !foundTagsNames.includes(tag));
  if (!tagsToCreate.length) {
    return foundTags;
  }
  const tagsDocuments = tagsToCreate.map((tag) => ({
    name: tag,
    items: [itemId],
  }));

  await Tag.insertMany(tagsDocuments);
}

module.exports = router;
