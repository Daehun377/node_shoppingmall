const express = require("express");
const router = express.Router();
const checkAuth = require("../config/check-auth");

const {   //이건 직접 불러오는 거고, 만약 상수화 하면
    products_get_all,
    products_get_detail,
    products_register_product,
    products_update_product,
    products_delete_product
} = require("../controllers/product");

// const productController = require("../controllers/product");
//이렇게 해서 productContoller.products_register_products 이런식으로도 가능하지만,
//이런 것을 줄이는 것이 좋은 코딩.


// product create
router.post("/" , checkAuth, products_register_product);

//product total retrieve
router.get("/", products_get_all);

//product detail get
router.get("/:productid", checkAuth, products_get_detail);

//product update
router.patch("/:productid", checkAuth, products_update_product);

//product detail delete
router.delete("/:productid", checkAuth,products_delete_product);







module.exports = router;