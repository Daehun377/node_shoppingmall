// 1
const mongoose = require("mongoose");

//스키마 정의 2
const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

// 3

module.exports = mongoose.model("user", userSchema);
