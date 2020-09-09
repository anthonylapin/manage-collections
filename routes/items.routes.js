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

    await addItemToTags(req.body.tags, newItem._id);
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
    await Item.updateOne({ _id: itemId }, { $set: { ...item, tags: [] } });

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

router.delete("/:id", async (req, res) => {
  const itemId = Types.ObjectId(req.params.id);
  try {
    await deleteItemFromTags(itemId);
    await deleteItem(itemId);

    res.json({
      message: `Deleted item with id: ${itemId}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

async function deleteItem(itemId) {
  await Item.deleteOne({ _id: itemId });
}

async function updateTags(tags, itemId) {
  await deleteItemFromTagsThatAreNotInGivenTags(tags, itemId);
  await addItemToTags(tags, itemId);
  await createNewTags(tags, itemId);
}

async function addItemToTags(tags, itemId) {
  await Tag.updateMany(
    { name: { $in: tags } },
    { $addToSet: { items: [itemId] } }
  );
}

async function deleteItemFromTagsThatAreNotInGivenTags(tags, itemId) {
  await Tag.updateMany(
    { items: [itemId], name: { $nin: tags } },
    { $pullAll: { items: [itemId] } }
  );
}

async function deleteItemFromTags(itemId) {
  await Tag.updateMany({ items: [itemId] }, { $pullAll: { items: [itemId] } });
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
