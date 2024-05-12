const express = require("express");
const router = express.Router();
const { homePage } = require("../controllers/homeController");
const Post = require("../models/postModel");

router.route("/")
    .get(homePage);

//더미 데이터 생성
// const numDummyData = 10;

// for(let i = 0; i < numDummyData; i++) {
//     const newPost = new Post({
//         title : `제목${i}`,
//         author : `작성자${i}`,
//         body : `내용 ${i} - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//     });

//     newPost.save()
//         .then(() => console.log(`더미데이터 ${i} 생성완료`))
//         .catch((err) => console.log(`오류 발생 ${err}`));
// };

module.exports = router;