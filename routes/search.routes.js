const { Router } = require("express");
const Item = require("../models/Item");
const Collection = require("../models/Collection");
const Comment = require("../models/Comment");
const Topic = require("../models/Topic");
const Tag = require("../models/Tag");

const router = Router();

router.get("/", async (req, res) => {
  const q = req.query.q;
  try {
    const items = await searchInDatabase(q);
    res.json({ items, query: q });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
});

async function searchInDatabase(q) {
  let items = [];
  let data;
  items = await searchInItems(q);

  data = await searchInCollections(q);
  items = [...items, ...data];

  data = await searchInComments(q);
  items = [...items, ...data];

  data = await searchInTopics(q);
  items = [...items, ...data];

  data = await searchInTags(q);
  items = [...items, ...data];

  uniqueItems = removeDuplicatesFromArray(items);

  return uniqueItems;
}

async function searchInItems(q) {
  const data = await Item.find({
    $text: {
      $search: q,
    },
  });

  return data;
}

async function searchInCollections(q) {
  let collections = await Collection.find({
    $text: {
      $search: q,
    },
  });

  collectionsIds = collections.map((collection) => collection._id);

  const items = await Item.find({ collectionId: { $in: collectionsIds } });
  return items;
}

async function searchInComments(q) {
  let comments = await Comment.find({
    $text: {
      $search: q,
    },
  });

  itemIds = comments.map((comment) => comment.itemId);

  const items = await Item.find({ _id: { $in: itemIds } });
  return items;
}

async function searchInTopics(q) {
  let topics = await Topic.find({
    $text: {
      $search: q,
    },
  });

  const topicsIds = topics.map((topic) => topic._id);

  const collections = await Collection.find({ topic: { $in: topicsIds } });
  const collectionIds = collections.map((collection) => collection._id);

  const items = await Item.find({ collectionId: { $in: collectionIds } });
  return items;
}

async function searchInTags(q) {
  let tags = await Tag.find({
    $text: {
      $search: q,
    },
  });

  arraysOfItemsIds = tags.map((tag) => tag.items);
  let itemsIds = [].concat.apply([], arraysOfItemsIds);
  itemsIds = [...new Set(itemsIds)];

  const items = await Item.find({ _id: { $in: itemsIds } });
  return items;
}

function removeDuplicatesFromArray(array) {
  const arrayOfUniqueIds = [];
  const uniqueArray = [];

  array.forEach((element) => {
    if (!arrayOfUniqueIds.includes(String(element._id))) {
      arrayOfUniqueIds.push(String(element._id));
      uniqueArray.push(element);
    }
  });

  return uniqueArray;
}

module.exports = router;
