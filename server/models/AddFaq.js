const mongoose = require("mongoose");

const addFaqSchema = new mongoose.Schema(
  {
    shippingPolicy: {
      type: String,
      required: true,
    },
    CancellationPolicy: {
      type: String,
      required: true,
    },
    ReturnPolicy: {
      type: String,
      required: true,
    },
    ReturnReplacementPolicy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddFaq = mongoose.model("faq", addFaqSchema);
module.exports = AddFaq;