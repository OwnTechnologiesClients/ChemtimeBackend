const Address = require("../models/Address")

const createAddress = async (req,res)=>{
    try {
     const newAddress = new Address(req.body);
     await newAddress.save();
     res.status(201).json({
         success: true,
         message: "Address created successfully",
         data: newAddress,
     });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving address",
            error: error.message,
        });
    }
}

module.exports = {
    createAddress
}