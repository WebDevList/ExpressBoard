const express = require("express");
const router = express.Router();
const { homePage, signInPage, signUpPage, register } = require("../controllers/homeController");
const Post = require("../models/postModel");

router.route("/")
    .get(homePage);

router.route("/signIn")
    .get(signInPage);

router.route("/signUp")
    .get(signUpPage)
    .post(register);

//@더미 데이터 생성
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

//@더미 데이터 생성2
// Post.insertMany({
//     category : "공지사항",
//     title : "공지",
//     author : "admin",
//     body : "공지사항 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
// });

//@새로운 필드를 이전 데이터에도 적용시키는 방법 .updateMany()
// Post.updateMany({}, { $set : { category : "자유" }})
//     .then(result => {
//         console.log("모든 게시물의 카테고리 업데이트 완료");
//         console.log(result);
//     })
//     .catch(error => {
//         console.log("업데이트 중 오류 발생:", error);
//     });

module.exports = router;