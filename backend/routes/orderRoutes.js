const express = require('express');


const { createOrder, getAllOrders, getUserOrders,deleteUserOrders, getKorders } = require('../controller/orderController');

const router = express.Router();


router.post("/addorder",createOrder)
router.get("/allorder",getAllOrders)
router.get("/userorder/:id",getUserOrders)
router.get("/getkorders/:id",getKorders)
router.delete("/deleteorders/:userId", deleteUserOrders);

module.exports = router;