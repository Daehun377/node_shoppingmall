const mongoose = require("mongoose");

//스키마 정의
const orderSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId, //이런 식으로 상속 받는 관계를 관계형 DB 라고 한다
        ref : "product",  //ObjectId가 속해 있는 모델을 넣어 준다
        required : true
    },
    quantity : {
        type : Number,
        default : 1
    }
});

module.exports = mongoose.model("order", orderSchema);