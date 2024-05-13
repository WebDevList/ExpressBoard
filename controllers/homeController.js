const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
        title : "Sign In",
        url : "/signUp",
        redirect : "Sign Up",
    };
    res.render("signIn", {locals, layout: signLayout});
};

//@desc sign up page
//@route GET /signUp
const signUpPage = (req, res) => {
    const locals = {
        title : "Sign Up",
        url : "/signIn",
        redirect : "Sign In",
    };
    res.render("signUp", {locals, layout: signLayout});
};

//@desc register user
//@route POST /signUp
const register = asyncHandler(async (req, res) => {
    const {userId, password, password2} = req.body;

    const existingUser = await User.findOne({ userId });
    if (existingUser) {
        return res.status(400).json({ message : "중복된 아이디입니다." });
    }

    if (password !== password2) {
        return res.status(400).json({ message : "비밀번호가 일치하지 않습니다."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        userId,
        password : hashedPassword,
    });

    await newUser.save();

    res.redirect("/");
});

//@desc view detail Post
//@route GET /post/:id
const detailPage = asyncHandler(async(req, res) => { //user id 비교해서 작성자와 일치하면 버튼 활성화 다르면 비활성화
    
});

module.exports = { homePage, signInPage, signUpPage, register };