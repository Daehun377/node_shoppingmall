const express = require("express");
const router = express.Router();

//order create
router.post("/", (req, res) => {
    res.json({
        message : "order create"
    });
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
