const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const connectDb = require("./config/dbConnect");

connectDb();

const port = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(expressLayouts);

app.use("/", require("./routes/home"));

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행중`);
});