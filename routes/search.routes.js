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
    res.json({ items });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again",
    });
  }
});

async function searchInDatabase(q) {
  let items = [];
  let data;
  data = await searchInItems(q);
  items = updateItemsArray(data, items);

  data = await searchInCollections(q);
  items = updateItemsArray(data, items);

  data = await searchInComments(q);
  items = updateItemsArray(data, items);

  data = await searchInTopics(q);
  items = updateItemsArray(data, items);

  data = await searchInTags(q);
  items = updateItemsArray(data, items);

  return items;
}

async function searchInItems(q) {
  const data = await Item.find(
    {
      $text: {
        $search: q,
      },
    },
    {
      __v: 0,
    }
  );

  return data;
}

async function searchInCollections(q) {
  let collections = await Collection.find(
    {
      $text: {
        $search: q,
      },
    },
    {
      __v: 0,
    }
  );

  collectionsIds = collections.map((collection) => collection._id);

  const items = await Item.find({ collectionId: { $in: collectionsIds } });
  return items;
}

async function searchInComments(q) {
  let comments = await Comment.find(
    {
      $text: {
        $search: q,
      },
    },
    {
      __v: 0,
    }
  );

  itemIds = comments.map((comment) => comment.itemId);

  const items = await Item.find({ _id: { $in: itemIds } });
  return items;
}

async function searchInTopics(q) {
  let topics = await Topic.find(
    {
      $text: {
        $search: q,
      },
    },
    {
      __v: 0,
    }
  );

  const topicsIds = topics.map((topic) => topic._id);

  const collections = await Collection.find({ topic: { $in: topicsIds } });
  const collectionIds = collections.map((collection) => collection._id);

  const items = await Item.find({ collectionId: { $in: collectionIds } });
  return items;
}

async function searchInTags(q) {
  let tags = await Tag.find(
    {
      $text: {
        $search: q,
      },
    },
    {
      __v: 0,
    }
  );

  arraysOfItemsIds = tags.map((tag) => tag.items);
  let itemsIds = [].concat.apply([], arraysOfItemsIds);
  itemsIds = [...new Set(itemsIds)];

  const items = await Item.find({ _id: { $in: itemsIds } });
  return items;
}

function updateItemsArray(data, items) {
  if (data.length) {
    data.forEach((element) =>
      items.pushIfNotExist(element, function (e) {
        return e._id === element._id;
      })
    );
  }
  return items;
}

Array.prototype.inArray = function (comparer) {
  for (var i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }
  return false;
};

Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};

module.exports = router;
