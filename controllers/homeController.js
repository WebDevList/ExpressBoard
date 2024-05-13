const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const nologinlayout = "./nologinUsers/noLoginLayout";
const loginlayout = "./loginUsers/loginLayout";
const signLayout = "./layouts/sign";

//@desc view homePage
//@route GET /
const homePage = asyncHandler(async(req, res) => {
    const locals = {
        title : "Home",
    };

    const posts = await Post.find({}).sort({ updatedAt : "desc" }).limit(10); // updatedAt : -1 도 같은 결과를 낸다.

    res.render("home", { locals, posts, layout : nologinlayout });
});

//@desc sign in page
//@route GET /signIn
const signInPage = (req, res) => {
    const locals = {
        title : "SignIn",
        url : "/signUp",
        redirect : "Sign Up",
    };
    res.render("signIn", {locals, layout: signLayout});
};

//@desc sign up page
//@route GET /signUp
const signUpPage = (req, res) => {
    const locals = {
        title : "SignUn",
        url : "/signIn",
        redirect : "Sign In",
    };
    res.render("signUp", {locals, layout: signLayout});
};

//@desc view detail Post
//@route GET /post/:id
const detailPage = asyncHandler(async(req, res) => { //user id 비교해서 작성자와 일치하면 버튼 활성화 다르면 비활성화
    
});

module.exports = { homePage, signInPage, signUpPage };