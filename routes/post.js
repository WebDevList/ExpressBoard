const express = require("express");
const router = express.Router();
const { writePage, registerPost, detailPage } = require("../controllers/postController");

router.route("/write")
    .get(writePage)
    .post(registerPost);

router.route("/:id")
    .get(detailPage);

module.exports = router;