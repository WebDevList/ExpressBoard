const mongoose = require("mongoose");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

const connectDb = asyncHandler(async () => {
    const db = await mongoose.connect(process.env.DB_CONNECT);
    console.log(`DB 연결됨 : ${db.connection.host}`);
});

module.exports = connectDb;