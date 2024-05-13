const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

//토큰 유효성검사 미들웨어
const checkLogin = (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    const token = req.cookies.token;
    
    if (!token) {
        return res.redirect("/signIn");
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ message : "로그인이 필요하거나 유효하지 않은 토큰입니다." });
    }
};

module.exports = checkLogin;