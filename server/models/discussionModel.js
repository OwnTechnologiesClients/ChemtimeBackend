const mongoose = require("mongoose");

const discussionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    course: {
      type: String,
      required: true,
    },
=======
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
    email: {
      type: String,
      required: true,
      unique: true,
    },
<<<<<<< HEAD
    contactnumber: {
=======
    phonenumber: {
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("discussions", discussionSchema);
