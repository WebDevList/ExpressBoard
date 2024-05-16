const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");
// require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const Post = require("../models/postModel");
const User = require("../models/userModel");

const loginLayout = "./loginUsers/loginLayout";
const noLoginLayout = "./noLoginUsers/noLoginLayout";

//@desc post page for write
//@route GET /post/write
const writePage = async(req, res) => {

    const locals = {
        title : "write",
    }

    const token = req.cookies.token;

    if(!token){
        return res.redirect("/signIn");
    }
    try{
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        res.locals.user = user;

        return res.render("post_write", { layout : loginLayout });
    } catch(error) {
        return res.status(500).render("error", {error});
    }
}

//@desc register post
//@route POST /post/write
const registerPost = asyncHandler(async (req, res) => {
    const { category, title, body } = req.body;

    let selectedCategory = ""

    if (category === "general") {
        selectedCategory = "자유";
    } else if (category === "notice") {
        selectedCategory = "공지";
    } else {
        return res.status(400).json({ message : "잘못된 접근입니다." });
    }

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/signIn");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        const newPost = await Post.create({
            category : selectedCategory,
            title,
            author : user.userId,
            body,
        });

        await newPost.save();
        
        res.redirect("/");
    } catch (error) {
        return res.status(500).render("error", {error});
    }
});

//@desc view detail Post
//@route GET /post/:id
const detailPage = asyncHandler(async(req, res) => { //user id 비교해서 작성자와 일치하면 버튼 활성화 다르면 비활성화
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(postId, { $inc : { hits : 1 }}, { new : true });

    const formattedDate = format(new Date(post.createdAt), "yyyy MMM dd");
    
    const token = req.cookies.token;

    if(!token){
        return res.render("noLoginUsers/detail_noLogin", { post , formattedDate, layout : noLoginLayout });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        res.locals.user = user;

        return res.render("loginUsers/detail_login", { post , formattedDate, layout : loginLayout });
    } catch(error) {
        return res.status(500).render("error", {error});
    }
});

//@desc edit post page
//@route GET /post/edit/:id
const editPage = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    const user = {
        userId : post.author
    };

    res.locals.user = user;

    res.render("edit", {post, layout: loginLayout});
});

//@desc edit post
//@route PUT /post/edit/:id
const editPost = asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    const postId = req.params.id;

    await Post.findByIdAndUpdate(postId, {title, body, updatedAt: Date.now()}, {new : true});

    res.redirect("/");
});

//@desc delete post
//@route DELETE /post/delete/:id
const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    await Post.findByIdAndDelete(postId);

    res.redirect("/");
});

module.exports = { writePage, registerPost, detailPage, editPage, editPost, deletePost};