const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    studentname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fathername: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    contactnumber: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    myfile: {
        type: String
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("students", studentSchema);