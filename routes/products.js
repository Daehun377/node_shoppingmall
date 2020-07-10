const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const checkAuth = require("../config/check-auth");

// product create
router.post("/" , checkAuth, (req, res) => {

    //모델의 새로운 instance 객체를 만들어 저장하는 법
    const product = new productModel({
      name : req.body.namelabel,
      price : req.body.pricelabel
    });



    product
        .save()
        .then(result => {
            res.json({
                message : "successful saved",
                productInfo : {
                    id : result._id,
                    name : result.name,
                    price : result.price,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/product/" + result._id
                    }
                }
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
            const response = {
                count : docs.length,
                products : docs.map(doc => {
                    return{
                        id : doc._id,
                        name : doc.name,
                        price : doc.price,
                        request : {
                            type : "GET",
                            url : "http://localhost:3000/product/" + doc._id
                        }
                    }
                })
            }
            res.json(response)


            // res.json({
            //     message : "sucessful getData",
            //     count : docs.length,
            //     products : docs
            // })
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
router.get("/:productid", checkAuth, (req, res) => {

    const id = req.params.productid;

    productModel
        .findById(id)
        .then(doc => {
            if(doc){
               return res.status(200).json({
                    message : "successful detail product",
                    productInfo : {
                        id : doc._id,
                        name : doc.name,
                        price : doc.price,
                        request : {
                            type : "GET",
                            url :"http://localhost:3000/product"
                        }
                    }
                });
            }
            // else{
            //     res.status(404).json({
            //         message : "product not found"
            //     })
            // }
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        }); //밑에 있는게 더 우선시 됨으로, CATCH 의 메세지가 뜬다. catch는 무조건 있어야 함.

});






//product update
router.patch("/:productid", checkAuth, (req,res) => {

    const id = req.params.productid;

    // update 할 내용 정의
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }


    productModel
        .updateOne({_id:id}, {$set:updateOps})
        .then(() => {
            res.status(200).json({
                message : "updated product",
                request : {
                    type : "GET",
                    url : "http://localhost:3000/product/" + id
                }
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
router.delete("/:productid", checkAuth, (req, res) =>{

    const id = req.params.productid;

    productModel
        .deleteOne({_id:id})
        .then(() => {
            //console.log(result) 이렇게 console로 찍어보면 어떤 값이 나오는지 알 수 있음.
            res.json({
                message : "successful deleted product",
                request :{
                    type : "GET",
                    url : "http://localhost:3000/product/"
                }

            });
        })
        .catch(err => {
            res.json({
                error : err.message
            })
        });

});


module.exports = router;