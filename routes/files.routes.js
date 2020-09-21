const { Router } = require("express");
const stringify = require("csv-stringify");
const Item = require("../models/Item");
const { Types } = require("mongoose");
const router = Router();

router.get("/csv/:collectionId", async (req, res) => {
  const collectionId = Types.ObjectId(req.params.collectionId);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="' + "collectionId-" + String(collectionId) + '.csv"'
  );
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Pragma", "no-cache");

  try {
    let items = await Item.find({ collectionId });
    items = items.map((item) => item._doc);
    stringify(items, { header: true }).pipe(res);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try again.",
    });
  }
});

module.exports = router;
