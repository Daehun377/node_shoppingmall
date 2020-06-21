const mongoose = require("mongoose");

const prodcutSchema = mongoose.Schema({
    name : String,
    price : String
});

module.exports = mongoose.model("product", prodcutSchema);