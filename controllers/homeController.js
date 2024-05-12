const asyncHandler = require("express-async-handler");
const nologinlayout = "./layouts/noLoginLayout";
const loginlayout = "./loginUsers/loginLayout";

//@desc view homePage
//@route GET /
const homePage = (req, res) => {
    const locals = {
        title : "Home",
    }
    res.render("home", { locals, layout : loginlayout });
};

module.exports = { homePage };