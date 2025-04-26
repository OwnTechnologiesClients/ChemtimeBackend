const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
<<<<<<< HEAD

=======
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    myfilename: {
      type: String,
      required: [true, "Uploaded file must have a name"],
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = mongoose.model("studentworks", studentSchema);
=======
module.exports = mongoose.model("students", studentSchema);
>>>>>>> 027508f69b19abd0a0e74a860c8eb530b571889e
