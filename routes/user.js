// 1
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


// 회원 가입

router.post("/register", (req, res) => {

    // 이메일 유무 체크 -> 패스 워드 암호화 -> 유저 데이터 베이스 생성

    userModel
        .findOne({email:req.body.email})
        .then(user => {
            if(user){
                return res.json({
                    message : "email exists"
                });
            }
            else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    if(err){
                        return res.json({
                            error : err.message
                        })
                    }
                    else{
                        const user = new userModel({
                            email : req.body.email,
                            password : hash
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

                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message : err.message
            });
        });
});


// 로그인

router.post("/login", (req, res) => {

    // 이메일 유무 체크 -> 패스 워드 매칭 -> 성공 메세지, 토큰을 반환 ( 사용자 정보를 암호화 한것 )

    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if(!user){
                return res.json({
                    message : "no email"
                });
            }
            else{

                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {

                    if(err || isMatch === false){
                        return res.json({
                            message : "password incorrect"
                        })
                    }
                    else{

                        // 토큰 생성
                        const token = jwt.sign(
                            {id : user._id, email : user.email},
                             process.env.SECRET_KEY, //임의로 정해주는 것
                            {expiresIn: "1h"}
                        );

                        res.json({
                            message : "successful login",
                            tokenInfo : token
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message : err.message
            });
        });



})





// 2
module.exports = router;