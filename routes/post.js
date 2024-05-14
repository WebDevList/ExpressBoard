const express = require("express");
const router = express.Router();
const { writePage } = require("../controllers/postController");

router.route("/write")
    .get(writePage);

module.exports = router;