const mongoose = require("mongoose");

const AdmissionFormSchema = mongoose.Schema(
  {
    registrationnumber: {
      type: String,
      //unique: true,
    },

    session: {
      type: String,
    },
    coursename: {
      type: String,
    },
    coursetype: {
      type: String,
    },
    subject: {
      type: String,
    },
    batch: {
      type: String,
    },


    studentname: {
      type: String,
    },
    dateofbirth: {
      type: String,
    },
    fathername: {
      type: String,
    },
    email: {
      type: String,
    },
    mobilenumber: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    qualification: {
      type: String,
    },
    university: {
      type: String,
    },
    passingyear: {
      type: String,
    },


    studentProfile: {
      type: String,
      //required: [true, "Uploaded file must have a name"],
    },

    payment: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admissions", AdmissionFormSchema);
