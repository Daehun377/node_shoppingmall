const express = require("express");
const router = express.Router();


// product create
router.post("/" , (req, res) => {

    const product = {
      name : req.body.namelabel,
      price : req.body.pricelabel
    };


    res.json({
        message : "product create",
        productInfo : product
    });
});

//product retrieve
router.get("/", (req, res) => {
    res.json({
        message : "product retrieve"
    });
});

//product update
router.patch("/", (req,res) => {
    res.json({
        message : "product update"
    });
});

//product delete
router.delete("/", (req, res) =>{
    res.json({
        message : "product delete"
    });
});




module.exports = router;