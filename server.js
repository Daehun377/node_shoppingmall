

const express = require("express");
const app = express(); // express 내에 있는 많은 함수들중에서 어떤 기능을 쓸것인지 . 으로 해서 불러오면 된다. why 가 아닌 how 로 접근 (개발을)



const productRoute = require("./routes/products");

// app.use((req, res) => {
//     res.json({
//         message : "It works!"
//     });
// });

app.use("/product", productRoute);



const PORT = 3000;

app.listen(PORT, console.log("server 시작됨"));