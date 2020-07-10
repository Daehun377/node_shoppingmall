const orderModel = require("../models/order");
const productModel = require("../models/product");


exports.orders_get_all = (req, res) => {

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
};

exports.orders_register_order = (req, res) => {

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
};

exports.orders_get_detail = (req, res) => {

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
};

exports.orders_update_order = (req, res) => {

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
};

exports.orders_delete_order = (req, res) => {

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
};