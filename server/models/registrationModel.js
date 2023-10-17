const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    coursename: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("registrations", registrationSchema);