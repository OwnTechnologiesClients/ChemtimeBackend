const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coupons: { type: String, required: true },
  amount: { type: String, required: true },
});

const Offers = mongoose.model("Offers", offerSchema);

module.exports = Offers;
