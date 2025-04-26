const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
<<<<<<< HEAD
    
=======
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
    email: {
      type: String,
      required: true,
      unique: true,
    },
    coursename: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    
=======
    dateofbirth: {
      type: String,
      required: true,
    },
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("registrations", registrationSchema);
