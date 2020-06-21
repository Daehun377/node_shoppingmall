

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express(); // express 내에 있는 많은 함수들중에서 어떤 기능을 쓸것인지 . 으로 해서 불러오면 된다. why 가 아닌 how 로 접근 (개발을)


// 커넥트 데이터 베이스

const db = "mongodb+srv://daehunkim:1650@cluster0-yprtg.mongodb.net/shoppingmall?retryWrites=true&w=majority";

mongoose.connect(db, {useNewUrlParser : true,  useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err.message));




// 라우팅 루트
const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");

// 미들 웨어
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


// 라우팅
app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = 3000;

app.listen(PORT, console.log("server 시작됨"));