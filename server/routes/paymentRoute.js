const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

///---------------------- Razorpay Routes ----------------------

router.get("/getkey", paymentController.getKey)

router.post("/checkout", paymentController.checkout)
router.post("/paymentVerification", paymentController.paymentVerification)
router.post("/admissionForm", paymentController.admissionForm)

// router.get("/getkey", (req, res) =>
//     res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// )

module.exports = router;

