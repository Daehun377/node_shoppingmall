const express = require("express");
const router = express.Router();
const orderModel = require("../models/order");
const productModel = require("../models/product");

//order create
router.post("/", (req, res) => {

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
                error : "prodcut not found"
            });
        });




    // res.json({
    //     message : "order create"
    // });
});

//order retrieve
router.get("/", (req, res) => {
    res.json({
        message : "order retrieve"
    });
});

//order update
router.put("/", (req,res) => {
    res.json({
        message : "order update"
    });
});

//order delete
router.delete("/", (req,res) => {
    res.json({
        message : "order delete"
    });
});

module.exports = router;
