const mongoose = require("mongoose");


// 커넥트 데이터 베이스


const dbOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true
}


mongoose.connect(process.env.MONGO_URI, dbOptions)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err.message));


