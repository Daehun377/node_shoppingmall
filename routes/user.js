// 1
const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

// 회원 가입

router.post("/register", (req, res) => {

    const user = new userModel({
        email : req.body.email,
        password : req.body.password
    })

    user
        .save()
        .then(user => {
            res.json({
                message : "successful signup",
                userInfo : {
                    id : user._id,
                    email : user.email,
                    password : user.password
                }
            })
        })
        .catch(err => {
            res.json({
                message : err.message
            });
        });

});


// 로그인

router.post("/login", (req, res) => {

})



// 2
module.exports = router;