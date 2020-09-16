const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const Collection = require("../models/Collection");
const User = require("../models/User");
const { Types } = require("mongoose");
const Item = require("../models/Item");
const Tag = require("../models/Tag");
const router = Router();

router.get("/", auth, async (req, res) => {
  const key = req.query.key;
  try {
    let collections = await Collection.find({ owner: req.user.userId });
    if (key) {
      collections = await sortCollection(key, collections);
    }
    res.json({
      collections,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  const userId = Types.ObjectId(req.user.userId);
  try {
    const collection = await Collection.findOne({ _id: req.params.id });
    const owner = await User.findOne({ _id: userId });

    res.json({
      collection,
      ownerName: `${owner.firstName} ${owner.lastName}`,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

router.post(
  "/create",
  [
    check(
      "description",
      "Description must be non-empty and maximum 140 characters."
    ).isLength({
      min: 1,
      max: 140,
    }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data during creating new collection.",
      });
    }

    try {
      const newCollection = await createNewCollection(
        req.body,
        req.user.userId
      );
      res.status(201).json({
        message: `New collection is created.`,
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({
        message: "Something went wrong, try again.",
      });
    }
  }
);

router.put("/:id", async (req, res) => {
  const collectionId = Types.ObjectId(req.params.id);
  try {
    await Collection.updateOne(
      { _id: collectionId },
      { $set: { ...req.body } }
    );

    res.json({
      message: "Updated",
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const collectionId = Types.ObjectId(req.params.id);
  try {
    const itemsIds = await findItemsIdsFromCollection(collectionId);
    await deleteItemsFromTags(itemsIds);
    await deleteItems(itemsIds);
    await deleteCollection(collectionId);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
});

async function createNewCollection(body, userId) {
  const newCollection = new Collection({
    name: body.name,
    owner: userId,
    description: body.description,
    topic: body.topic,
    imageUrl: body.imageUrl,
    numericField1: body.numericField1,
    numericField2: body.numericField2,
    numericField3: body.numericField3,
    oneLineField1: body.oneLineField1,
    oneLineField2: body.oneLineField2,
    oneLineField3: body.oneLineField3,
    textField1: body.textField1,
    textField2: body.textField2,
    textField3: body.textField3,
    dateField1: body.dateField1,
    dateField2: body.dateField2,
    dateField3: body.dateField3,
    checkboxField1: body.checkboxField1,
    checkboxField2: body.checkboxField2,
    checkboxField3: body.checkboxField3,
  });
  await newCollection.save();
  console.log(newCollection);
  return newCollection;
}

async function findItemsIdsFromCollection(collectionId) {
  const items = await Item.find({ collectionId });
  return items.map((item) => Types.ObjectId(item._id));
}

async function deleteItemsFromTags(itemsIds) {
  await Tag.updateMany(
    { items: { $in: itemsIds } },
    { $pullAll: { items: itemsIds } }
  );
}

async function deleteItems(itemsIds) {
  await Item.deleteMany({ _id: { $in: itemsIds } });
}

async function deleteCollection(collectionId) {
  await Collection.deleteOne({ _id: collectionId });
}

const sortKeys = {
  Name: "NAME",
  DateCreated: "DATE_CREATED",
  Size: "SIZE",
  Default: "DEFAULT",
};

async function sortCollection(key, collections) {
  switch (key) {
    case sortKeys.Name:
      return sortByName(collections);
    case sortKeys.DateCreated:
      return sortByDate(collections);
    case sortKeys.Size:
      const sortedCollections = await sortBySize(collections);
      return sortedCollections;
    default:
      console.log("No sort");
      return collections;
  }
}

function sortByName(collections) {
  collections.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return collections;
}

function sortByDate(collections) {
  collections.sort((a, b) => {
    let dateA = new Date(a.created);
    let dateB = new Date(b.created);
    return dateB - dateA;
  });

  return collections;
}

async function sortBySize(collections) {
  const sortedCollections = [];
  let collectionIds = collections.map((collection) => collection._id);
  let items = await Item.find({ collectionId: { $in: collectionIds } }).sort({
    collectionId: 1,
  });

  collectionsIds = items.map((item) => item.collectionId);
  collectionsIds = removeDuplicatesFromArray(collectionsIds);

  collectionsIds.forEach((id) => {
    let foundCollection = collections.find(
      (collection) => String(collection._id) === String(id)
    );
    sortedCollections.push(foundCollection);
  });

  collections.forEach((collection) => {
    if (!sortedCollections.includes(collection)) {
      sortedCollections.push(collection);
    }
  });

  return sortedCollections;
}

function removeDuplicatesFromArray(array) {
  const arrayOfUniqueIds = [];
  const uniqueArray = [];

  array.forEach((element) => {
    if (!arrayOfUniqueIds.includes(String(element))) {
      arrayOfUniqueIds.push(String(element));
      uniqueArray.push(element);
    }
  });

  return uniqueArray;
}

module.exports = router;
