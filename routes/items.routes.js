const { Router } = require("express");
const auth = require("../middleware/auth.middleware");
const Tag = require("../models/Tag");
const Item = require("../models/Item");
const Collection = require("../models/Collection");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const User = require("../models/User");
const Topic = require("../models/Topic");
const { Types } = require("mongoose");
const helper = require("../helper");
const { sortArrayByElementOccurences } = require("../helper");

const router = Router();

router.get("/", async (req, res) => {
  const key = req.query.key;
  const tagId = req.query.tag;
  try {
    let items;

    if (tagId) {
      itemsAndTagName = await getItemsFromTag(tagId);
      return res.json({
        items: itemsAndTagName.items,
        query: itemsAndTagName.tag,
      });
    }

    if (key === "DATE") {
      items = await Item.find({}).sort({ created: -1 });
    } else {
      items = await Item.find({});
    }

    res.json({ items });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      collectionId: Types.ObjectId(req.body.collectionId),
      tags: [],
    });
    await newItem.save();
    console.log(req.body.tags);
    if (req.body.tags[0]) {
      await addItemToTags(req.body.tags, newItem._id);
      await createNewTags(req.body.tags, newItem._id);
    }

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
  const collectionId = Types.ObjectId(req.params.collectionId);
  const sortKey = req.query.key;
  try {
    let items = await Item.find({
      collectionId,
    });
    if (sortKey) {
      items = await sortItems(sortKey, items);
    }

    res.json({ items });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.get("/item/:itemId", async (req, res) => {
  const itemId = Types.ObjectId(req.params.itemId);
  try {
    const item = await getItem(itemId);
    const collection = await getCollection(item.collectionId);

    res.send({
      item,
      collection,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

router.put("/:itemId", async (req, res) => {
  const item = req.body.item;
  const itemId = Types.ObjectId(req.params.itemId);
  try {
    await Item.updateOne({ _id: itemId }, { $set: { ...item, tags: [] } });

    if (item.tags.length) {
      await updateTags(item.tags, itemId);
    }

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

async function getItem(itemId) {
  const item = await Item.findById(itemId);
  const tags = await getTags(itemId);
  return {
    ...item._doc,
    tags,
  };
}

async function getTags(itemId) {
  const tags = await Tag.find({ items: { $in: [itemId] } });
  return tags.map((tag) => tag.name);
}

async function getCollection(collectionId) {
  const collection = await Collection.findById(collectionId);
  const owner = await getOwnerName(collection.owner);
  const topic = await getTopicName(collection.topic);

  return {
    _id: collection._id,
    name: collection.name,
    owner,
    topic,
    numericFieldKey1: collection.numericField1,
    numericFieldKey2: collection.numericField2,
    numericFieldKey3: collection.numericField3,
    oneLineFieldKey1: collection.oneLineField1,
    oneLineFieldKey2: collection.oneLineField2,
    oneLineFieldKey3: collection.oneLineField3,
    textFieldKey1: collection.textField1,
    textFieldKey2: collection.textField2,
    textFieldKey3: collection.textField3,
    dateFieldKey1: collection.dateField1,
    dateFieldKey2: collection.dateField2,
    dateFieldKey3: collection.dateField3,
    checkboxFieldKey1: collection.checkboxField1,
    checkboxFieldKey2: collection.checkboxField2,
    checkboxFieldKey3: collection.checkboxField3,
  };
}

async function getTopicName(topicId) {
  const topic = await Topic.findById(topicId);
  return topic.name;
}

async function getOwnerName(ownerId) {
  const user = await User.findById(ownerId);
  const username = `${user.firstName} ${user.lastName}`;
  return username;
}

const sortKeys = {
  Default: "DEFAULT",
  Name: "NAME",
  DateCreated: "DATE_CREATED",
  Tags: "TAGS",
  Comments: "COMMENTS",
  Likes: "LIKES",
};

async function sortItems(sortKey, items) {
  let sortedItems;
  switch (sortKey) {
    case sortKeys.Name:
      return helper.sortByName(items);
    case sortKeys.DateCreated:
      return helper.sortByDate(items);
    case sortKeys.Tags:
      sortedItems = await sortByTags(items);
      return sortedItems;
    case sortKeys.Comments:
      sortedItems = await sortByLikesOrComments(items, sortKeys.Comments);
      return sortedItems;
    case sortKeys.Likes:
      sortedItems = await sortByLikesOrComments(items, sortKeys.Likes);
      return sortedItems;
    default:
      return items;
  }
}

async function sortByTags(items) {
  let itemsIds = items.map((item) => item._id);
  let tags = await Tag.find({ items: { $in: itemsIds } });
  let arrayOfArraysOfItemsIds = tags.map((tag) => tag.items);

  let arrayOfItemsIds = [].concat.apply([], arrayOfArraysOfItemsIds);
  arrayOfItemsIds = helper.sortArrayByElementOccurences(arrayOfItemsIds);

  const sortedItems = [];

  arrayOfItemsIds.forEach((id) => {
    const candidate = items.find((item) => String(item._id) === String(id));
    if (candidate) {
      sortedItems.push(candidate);
    }
  });

  items.forEach((item) => {
    if (!sortedItems.includes(item)) {
      sortedItems.push(item);
    }
  });

  return sortedItems;
}

async function sortByLikesOrComments(items, key) {
  const sortedItems = [];
  let things = [];
  let itemsIds = items.map((item) => item._id);

  if (key === sortKeys.Likes) {
    const likes = await Like.find({ itemId: { $in: items } });
    things = likes.map((like) => like.itemId);
  } else {
    let comments = await Comment.find({ itemId: { $in: itemsIds } });
    things = comments.map((comment) => comment.itemId);
  }

  let sortedItemsIds = sortArrayByElementOccurences(things);

  sortedItemsIds.forEach((id) => {
    const candidate = items.find((item) => String(item._id) === String(id));
    sortedItems.push(candidate);
  });

  items.forEach((item) => {
    if (!sortedItems.includes(item)) {
      sortedItems.push(item);
    }
  });
  return sortedItems;
}

async function getItemsFromTag(tagId) {
  const tag = await Tag.findById(Types.ObjectId(tagId));
  const itemsIds = tag.items;
  const items = await Item.find({ _id: { $in: itemsIds } });
  return { items, tag: tag.name };
}

module.exports = router;
