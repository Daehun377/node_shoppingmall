

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");

dotEnv.config();


const app = express(); // express 내에 있는 많은 함수들중에서 어떤 기능을 쓸것인지 . 으로 해서 불러오면 된다. why 가 아닌 how 로 접근 (개발을)


// 데이터베이스 연결

require("./config/database");



// 라우팅 루트
const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");
const userRoute = require("./routes/user");

// 미들 웨어
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


// 라우팅
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 7000; //1순위, 2순위

app.listen(PORT, console.log("server 시작됨"));