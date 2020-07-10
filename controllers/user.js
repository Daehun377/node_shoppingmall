const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");


exports.user_register =  (req, res) => {

    // 이메일 유무 체크 -> 패스 워드 암호화 -> 유저 데이터 베이스 생성

    const {email, password} = req.body;
    userModel
        .findOne({email})
        .then(user => {
            if(user){
                return res.json({
                    message : "email exists"
                });
            }
            else{
                bcrypt.hash(password, 10, (err, hash) => {

                    if(err){
                        return res.json({
                            error : err.message
                        })
                    }
                    else{
                        const user = new userModel({
                            email,
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
};

exports.user_login =  (req, res) => {

    // 이메일 유무 체크 -> 패스 워드 매칭 -> 성공 메세지, 토큰을 반환 ( 사용자 정보를 암호화 한것 )

    const {email, password} = req.body;

    userModel
        .findOne({email})
        .then(user => {
            if(!user){
                return res.json({
                    message : "no email"
                });
            }
            else{

                bcrypt.compare(password, user.password, (err, isMatch) => {

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



};