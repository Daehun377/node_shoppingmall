const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded =  jwt.verify(token, "secretToken");
        req.userData = decoded;
        next() //다음 동작으로 넘어가게
    }
    catch(error){
        return res.json({
            message : "auth failed" //토큰 사용시간 만료되거나, 정상적인 토큰 발행이 아니거나, 토큰내에 유저가 없거나
        })
    }
}