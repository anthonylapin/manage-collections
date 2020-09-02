const { Router } = require("express");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/create", auth, async (req, res) => {});

module.exports = router;
