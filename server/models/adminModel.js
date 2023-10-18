const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    registration: {
      type: String,
      required: true,
      unique: true,
    },
    cname: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admins", adminSchema);
