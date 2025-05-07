const crypto = require('crypto')
const Razorpay = require("razorpay")
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const route = express.Router();


const ApplicationForm = require("../models/applicationFormModel");
const AdmissionFormModel = require('../models/admissionFormModel');
const multer = require("multer");

//Live api keys
const apiKeyId = "rzp_live_q4KW9y4BBurkJz"
const apiKeySecret = "hY4vd9o5GjuElZpln4oky9bQ"

// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
// });

var instance = new Razorpay({
    key_id: apiKeyId,
    key_secret: apiKeySecret
});

const getKey = (req, res) => res.status(200).json({ key: apiKeyId })

const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            //amount: 50000,
            currency: "INR",
        };
        const order = await instance.orders.create(options);



        res.status(200).json({
            success: true,
            order,
        });
    } catch (e) {
        
        console.error(e);
    }
};


const paymentVerification = async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', apiKeySecret)
        .update(body.toString())
        .digest('hex');


    const isAuthentic = expectedSignature === razorpay_signature;

    // if (isAuthentic) {
    //     // Database comes here

    //     // await Payment.create({
    //     //   razorpay_order_id,
    //     //   razorpay_payment_id,
    //     //   razorpay_signature,
    //     // });

    //     res.redirect(
    //       `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    //     );
    //   } else {
    //     res.status(400).json({
    //       success: false,
    //     });
    //   }

    if (isAuthentic) {
        try {

            const userId = req.userId;

            const isUserExist = await User.find({ '_id': userId })
            if (isUserExist.length > 0) {

                const data = {
                    planType: planType,
                    amount: amount,
                    months: months,
                    status: "Authorized",
                    razorpayOrderId: razorpay_order_id,
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    purchasingData: purchasingData
                }

                const response = await Services.createPayment(userId, data)

                if (response) {
                    res.status(201).json({
                        error: false,
                        message: 'Payment Verified Successfully!!',
                        data: response
                    });
                } else {
                    res.status(200).json({
                        error: true,
                        message: 'Error While Payment Verification!!'
                    })
                }
            } else {
                res.status(200).json({
                    error: true,
                    message: 'Not Such User Found!!'
                })
            }
        } catch (error) {
            next(error)
        }
    } else {
        res.status(400).json({
            success: false
        })
    }

    res.status(200).json({
        success: true
    })

};






const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now();
        const ext = file.mimetype.split("/")[1];
        // cb(null, uniqueSuffix+file.originalname);
        return cb(null, `files-admin-${Date.now()}.jpg`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg") {
        cb(null, true);
    } else {
        cb(new Error("Not a JPEG File!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

// const upload = multer({ dest: "./public/" })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public")
    },
    filename: function (req, file, cb) {
        //return cb(null, `${Date.now()}_${file.originalname}`)
        return cb(null, `${file.originalname}`)
    }
})

const upload1 = multer({ storage })

route.post('/upload', upload1.single('studentProfile'), async (req, res) => {
    try {
        tempFile = req.file.filename;

        // const student = new ApplicationForm(req.body);
        // await student.save();

        //await ApplicationForm.create({ studentProfile: imageName })
        //console.log("====>>> SUCESS");
    } catch (error) {
        console.log("====>>> ERROR", error.message);
    }

})

const admissionForm = async (req, res) => {
    try {
        const registrationFormExists = await AdmissionFormModel.findOne({
            registrationnumber: req.body.registrationnumber,
        });

        //req.body.studentProfile = tempFile;
        //console.log("---->>>>>Filename Data:  ", req.body.studentProfile);

        if (registrationFormExists) {
            return res.send({
                success: false,
                message: "Registration already have been done",
            });
        }


        const registration = new AdmissionFormModel(req.body);
        console.log("-----=====>>>  ", registration);

        await registration.save();

        return res.send({
            success: true,
            message: "Registration done successfully",
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};



module.exports = {
    getKey,
    checkout,
    paymentVerification,
    admissionForm
}
