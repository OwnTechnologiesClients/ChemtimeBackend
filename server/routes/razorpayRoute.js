const express = require("express");
const route = express.Router();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: "rzp_live_q4KW9y4BBurkJz",
  key_secret: "hY4vd9o5GjuElZpln4oky9bQ",
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
    const razorpay_signature = req.headers["xrazorpaysignature"];

    const key_secret = "hY4vd9o5GjuElZpln4oky9bQ";

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
