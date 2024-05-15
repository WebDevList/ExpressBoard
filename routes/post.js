const express = require("express");
const router = express.Router();
const { writePage, registerPost, detailPage, editPage, edit } = require("../controllers/postController");
const checkLogin = require("../middlewares/checkLogin");


router.route("/write")
    .get(writePage)
    .post(registerPost);

router.route("/:id")
    .get(detailPage);

router.route("/edit/:id")
    .get(editPage)
    .put(checkLogin, edit);

module.exports = router;