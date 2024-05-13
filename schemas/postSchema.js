const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    category : {
        type : String,
        required : true,
        default : "자유", // 자유 or 공지
    },
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now,
    },
    hits : {
        type : Number,
        default : 0
    },
});

module.exports = PostSchema;