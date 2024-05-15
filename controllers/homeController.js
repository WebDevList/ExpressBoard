const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const nologinlayout = "./nologinUsers/noLoginLayout";
const loginlayout = "./loginUsers/loginLayout";
const signLayout = "./layouts/sign";

//@desc view homePage
//@route GET /
const homePage = asyncHandler(async(req, res) => {
    const locals = {
        title : "Home",
    };

    let layout = nologinlayout;
    const token = req.cookies.token;

    try {
        if (token) {
            const decoded = jwt.verify(token, jwtSecret);

            req.userId = decoded.id;

            const user = await User.findById(req.userId);

            res.locals.user = user;

            layout = loginlayout;
        }
        const posts = await Post.find({}).sort({ updatedAt : "desc" }).limit(10); // updatedAt : -1 도 같은 결과를 낸다.

        return res.render("home", { locals, posts, layout });
    } catch (error) {
        return res.status(500).render("error", { error });
    }
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

//@desc log in
//@route POST /signIn
const logIn = asyncHandler(async (req, res) => {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
        return res.status(401).json({ message : "존재하지 않는 사용자입니다." });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
        return res.status(401).json({ message : "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign({ id : user._id }, jwtSecret);

    res.cookie("token", token, { httpOnly : true });

    res.redirect("/");
});

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

//@desc logout
//@route GET /logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
};

//@desc general page
//@route GET /general
const generalPage = asyncHandler(async(req, res) => {
    const posts = await Post.find({ category : "자유" }).sort({ updatedAt: "desc"});

    const token = req.cookies.token;

    if(!token) {
        return res.render("./category/general", { posts, layout: nologinlayout });
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        res.locals.user = user;

        return res.render("./category/general", { posts, layout: loginlayout });
    } catch(error) {
        return res.status(500).render("error", {error});
    }
});

//@desc notice page
//@route GET /general
const noticePage = asyncHandler(async(req, res) => {
    const posts = await Post.find({ category : "공지" }).sort({ updatedAt: "desc"});

    const token = req.cookies.token;

    if(!token) {
        return res.render("./category/notice", { posts, layout: nologinlayout });
    }

    try{
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.id;

        const user = await User.findById(req.userId);

        res.locals.user = user;

        return res.render("./category/notice", { posts, layout: loginlayout });
    } catch(error) {
        return res.status(500).render("error", { error });
    }
});

module.exports = { homePage, signInPage, logIn, signUpPage, register, logout, generalPage, noticePage};