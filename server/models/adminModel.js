const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
<<<<<<< HEAD
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    }
=======
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
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admins", adminSchema);
