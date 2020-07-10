// 1
const express = require("express");
const router = express.Router();

const {
    user_register,
    user_login
} = require("../controllers/user");


// 회원 가입
router.post("/register", user_register);


// 로그인
router.post("/login", user_login);


// 2
module.exports = router;