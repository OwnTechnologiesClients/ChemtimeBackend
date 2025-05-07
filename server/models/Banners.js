const mongoose = require("mongoose");

const bannersSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Banners = mongoose.model("banners", bannersSchema);
module.exports = Banners;