// backend/routes/paymentRoutes.js
const express = require('express');
const { createOrder, verifyPayment } = require('../controller/paymentController');
const router = express.Router();

router.post('/create-order', createOrder);
// router.post('/verify-payment', verifyPayment);

router.post('/verify', verifyPayment);
module.exports = router;
