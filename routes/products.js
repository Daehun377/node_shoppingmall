const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

// product create
router.post("/" , (req, res) => {



    const product = new productModel({
      name : req.body.namelabel,
      price : req.body.pricelabel
    });


    product
        .save()
        .then(result => {
            res.json({
                message : "successful saved",
                productInfo : result
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
    //
    //
    // res.json({
    //     message : "product create",
    //     productInfo : product
    // });
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