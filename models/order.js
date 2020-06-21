const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId, //이런식으로 상속받는 관계를 관계형 DB라고 한다
        ref : "product",
        required : true
    },
    quantity : {
        type : Number,
        default : 1
    }
});

module.exports = mongoose.model("order", orderSchema);