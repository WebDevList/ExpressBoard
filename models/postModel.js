const mongoose = require("mongoose");
const PostSchema = require("../schemas/postSchema");

module.exports = mongoose.model("Post", PostSchema);