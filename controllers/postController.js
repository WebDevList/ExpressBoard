const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/userModel");

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

        return res.render(res.render("post_write", { layout : "./loginUsers/loginLayout" }))
    } catch(error) {
        return res.status(500).render("error", {error});
    }
}

//@desc view detail Post
//@route GET /post/:id
const detailPage = asyncHandler(async(req, res) => { //user id 비교해서 작성자와 일치하면 버튼 활성화 다르면 비활성화
    res.render();
});

module.exports = { writePage };