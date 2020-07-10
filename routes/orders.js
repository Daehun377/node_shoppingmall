const express = require("express");
const router = express.Router();
const checkAuth = require("../config/check-auth");

const {
    orders_get_all,
    orders_register_order,
    orders_get_detail,
    orders_update_order,
    orders_delete_order
} = require("../controllers/order");

//order create
router.post("/", checkAuth, orders_register_order);

//order total retrieve
router.get("/", checkAuth, orders_get_all);


// order detail data get
router.get("/:orderid", checkAuth, orders_get_detail);

//order update
router.put("/:orderid", checkAuth, orders_update_order);

//order delete
router.delete("/:orderid", checkAuth, orders_delete_order);

module.exports = router;
