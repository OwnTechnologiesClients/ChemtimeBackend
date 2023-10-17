const mongoose = require("mongoose");

const applicationFormSchema = mongoose.Schema({
    registrationnumber: {
        type: String,
        required: true,
        unique: true,
    },
    courseduration: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    coursetype: {
        type: String,
        required: true
    },
    nameofexamination: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    fatheroccupation: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    modeofpayment: {
        type: String,
        required: true
    },
    knowaboutus: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    xyearpassing: {
        type: String,
        required: true
    },
    xcgpa: {
        type: String,
        required: true
    },
    xdivision: {
        type: String,
        required: true
    },
    xcollege: {
        type: String,
        required: true
    },
    xuniversity: {
        type: String,
        required: true
    },
    xiiyearpassing: {
        type: String,
        required: true
    },
    xiicgpa: {
        type: String,
        required: true
    },
    xiidivision: {
        type: String,
        required: true
    },
    xiicollege: {
        type: String,
        required: true
    },
    xiiuniversity: {
        type: String,
        required: true
    },
    graduationyearpassing: {
        type: String,
        required: true
    },
    graduationcgpa: {
        type: String,
        required: true
    },
    graduationdivision: {
        type: String,
        required: true
    },
    graduationcollege: {
        type: String,
        required: true
    },
    graduationuniversity: {
        type: String,
        required: true
    },
    postgraduationyearpassing: {
        type: String,
        required: true
    },
    postgraduationcgpa: {
        type: String,
        required: true
    },
    postgraduationdivision: {
        type: String,
        required: true
    },
    postgraduationcollege: {
        type: String,
        required: true
    },
    postgraduationuniversity: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("applications", applicationFormSchema);