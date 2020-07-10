const express = require("express");
const router = express.Router();
const orderModel = require("../models/order");
const productModel = require("../models/product");
const checkAuth = require("../config/check-auth");

//order create
router.post("/", checkAuth, (req, res) => {

    productModel
        .findById(req.body.productId)
        .then(product => {

            const order = new orderModel({
                product : req.body.productId,
                quantity : req.body.qty
            });

            order
                .save()
                .then(result => {
                    res.json({
                        message : "successful order saved",
                        orderInfo : {
                            id: result._id,
                            product : result.product,
                            quantity : result.quantity,
                            request : {
                                type : "GET",
                                url : "http://localhost:3000/order/" + result._id
                            }
                        }
                    })
                })
                .catch(err => {
                    res.json({
                        error : err.message
                    });
                });
        })
        .catch(err => {
            res.json({
                error : "product not found"
            });
        });




    // res.json({
    //     message : "order create"
    // });
});

//order total retrieve
router.get("/", checkAuth, (req, res) => {

    orderModel
        .find()
        .populate("product", "name price")
        .then(docs => {
            const response = {
                count : docs.length,
                orders : docs.map(doc => {
                    return{
                        id : doc._id,
                        product : doc.product,
                        quantity : doc.quantity,
                        request : {
                            type : "GET",
                            url : "http://localhost:3000/order/" + doc._id
                        }
                    }
                })
            }
            res.json(response)
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
    // res.json({
    //     message : "order retrieve"
    // });
});



// order detail data get
router.get("/:orderid", checkAuth, (req, res) => {

    const id = req.params.orderid;

    console.log(id);

    orderModel
        .findById(id)
        .populate("product", "name price")
        .then(doc => {
            console.log(doc)
            if(doc){
                return res.status(200).json({
                    message : "successful detail order",
                    orderInfo : {
                        id : doc._id,
                        product : doc.product,
                        quantity: doc.quantity,
                        request : {
                            type : "GET",
                            url : "http://localhost:3000/order"
                        }
                    }
                });
            }
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});




//order update
router.put("/:orderid", checkAuth, (req, res) => {

    const id = req.params.orderid;

    //업데이트 내용 정의
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .updateOne({_id:id}, {$set:updateOps})
        .then(() => {
            res.status(200).json({
                message : "updated order",
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/"+ id
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        })
    // res.json({
    //     message : "order update"
    // });
});

//order delete
router.delete("/:orderid", checkAuth, (req, res) => {

    const id = req.params.orderid;

    orderModel
        .deleteOne({_id:id})
        .then(() => { 
            res.json({
                message : "successful deleted order",
                request : {
                    type : "GET",
                    url : "http://localhost:3000/order/"
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            })
        });
    // res.json({
    //     message : "order delete"
    // });
});

module.exports = router;
