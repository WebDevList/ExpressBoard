const asyncHandler = require("express-async-handler");
const nologinlayout = "./layouts/noLoginLayout";
const loginlayout = "./loginUsers/loginLayout";
const Post = require("../models/postModel");

//@desc view homePage
//@route GET /
const homePage = asyncHandler(async(req, res) => {
    const locals = {
        title : "Home",
    };

    const posts = await Post.find({}).sort({ updatedAt : "desc" }).limit(10); // updatedAt : -1 도 같은 결과를 낸다.

    res.render("home", { locals, posts, layout : nologinlayout });
});

const recentPost = asyncHandler(async (req, res) => {

})

module.exports = { homePage };