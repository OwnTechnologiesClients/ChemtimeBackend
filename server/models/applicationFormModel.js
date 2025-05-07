const mongoose = require("mongoose");

const applicationFormSchema = mongoose.Schema(
  {
    registrationnumber: {
      type: String,

      //unique: true,
    },
    studentProfile: {
      type: String,
      //required: [true, "Uploaded file must have a name"],
    },
    courseduration: {
      type: String,

    },
    session: {
      type: String,

    },
    coursetype: {
      type: String,

    },
    coursename: {
      type: String,

    },
    subject: {
      type: String,

    },
    studentname: {
      type: String,

    },
    dateofbirth: {
      type: String,

    },
    category: {
      type: String,

    },
    gender: {
      type: String,

    },
    fathername: {
      type: String,

    },
    fatheroccupation: {
      type: String,

    },
    designation: {
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
    phonenumber: {
      type: String,

    },
    mobilenumber: {
      type: String,

    },
    email: {
      type: String,

    },
    modeofpayment: {
      type: String,

    },
    knowaboutus: {
      type: String,

    },
    date: {
      type: String,

    },
    place: {
      type: String,

    },
    price: {
      type: String,

    },
    xyearpassing: {
      type: String,

    },
    xcgpa: {
      type: String,

    },
    xdivision: {
      type: String,

    },
    xcollege: {
      type: String,

    },
    xuniversity: {
      type: String,

    },
    xiiyearpassing: {
      type: String,

    },
    xiicgpa: {
      type: String,

    },
    xiidivision: {
      type: String,

    },
    xiicollege: {
      type: String,

    },
    xiiuniversity: {
      type: String,

    },
    graduationyearpassing: {
      type: String,

    },
    graduationcgpa: {
      type: String,

    },
    graduationdivision: {
      type: String,

    },
    graduationcollege: {
      type: String,

    },
    graduationuniversity: {
      type: String,

    },
    postgraduationyearpassing: {
      type: String,

    },
    postgraduationcgpa: {
      type: String,

    },
    postgraduationdivision: {
      type: String,

    },
    postgraduationcollege: {
      type: String,

    },
    postgraduationuniversity: {
      type: String,

    },
    payment: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("applications", applicationFormSchema);
