// 1
const mongoose = require("mongoose");

//스키마 정의 2
const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password : {
        type : String,
        required : true
    }
});

// 3

module.exports = mongoose.model("user", userSchema);
