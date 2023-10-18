const express = require("express");
const route = express.Router();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_XIQpLJB0JJOCKa",
  key_secret: "VTKjL1ldgDB6F1ir9kE5AdFw",
});

route.post("/createOrder", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    razorpayInstance.orders.create(
      { amount, currency, receipt, notes },
      (err, order) => {
        if (!err) res.json(order);
        else res.send(err);
      }
    );
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

route.post("/verifyOrder", (req, res) => {
  try {
    const { order_id, payment_id } = req.body;
    const razorpay_signature = req.headers["x-razorpay-signature"];

    const key_secret = "VTKjL1ldgDB6F1ir9kE5AdFw";

    let hmac = crypto.createHmac("sha256", key_secret);

    hmac.update(order_id + "|" + payment_id);

    const generated_signature = hmac.digest("hex");

    if (razorpay_signature === generated_signature) {
      res.json({ success: true, message: "Payment has been verified" });
    } else res.json({ success: false, message: "Payment verification failed" });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = route;
