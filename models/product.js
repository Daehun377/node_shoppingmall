const mongoose = require("mongoose");


//스키마 정의
const productSchema = mongoose.Schema({
    name :  {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("product", productSchema);