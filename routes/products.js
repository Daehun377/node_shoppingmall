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




//product total retrieve
router.get("/", (req, res) => {

    productModel
        .find()
        .then(docs => {
            res.json({
                message : "sucessful getData",
                count : docs.length,
                products : docs
            })
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
    // res.json({
    //     message : "product retrieve"
    // });
});


//product detail get
router.get("/:productid", (req, res) => {

    const id = req.params.productid;

    productModel
        .findById(id)
        .then(doc => {
            if(doc){
                return res.status(200).json({
                    message : "succesful detail product",
                    productInfo : doc
                });
            }
            else{
                res.status(404).json({
                    message : "product not found"
                })
            }
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });

});






//product update
router.patch("/:productid", (req,res) => {

    const id = req.params.productid;

    // update 할 내용 정의
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }


    productModel
        .updateOne({_id:id}, {$set:updateOps})
        .then(result => {
            res.status(200).json({
                message : "updated product",
                updateProduct : result
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
    // res.json({
    //     message : "product update"
    // });
});

//product detail delete
router.delete("/:productid", (req, res) =>{

    const id = req.params.productid;

    productModel
        .deleteOne({_id:id})
        .then(() => {
            //console.log(result) 이렇게 console로 찍어보면 어떤 값이 나오는지 알 수 있음.
            res.json({
                message : "successful deleted product"
                // result : result
            })
        })
        .catch(err => {
            res.json({
                error : err.message
            })
        });

});




module.exports = router;