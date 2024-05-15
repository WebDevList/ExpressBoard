const express = require("express");
const router = express.Router();
const { writePage, registerPost, detailPage, editPage, editPost, deletePost } = require("../controllers/postController");
const checkLogin = require("../middlewares/checkLogin");


router.route("/write")
    .get(writePage)
    .post(registerPost);

router.route("/:id")
    .get(detailPage);

router.route("/edit/:id")
    .get(editPage)
    .put(checkLogin, editPost)
    .delete(checkLogin, deletePost);

module.exports = router;