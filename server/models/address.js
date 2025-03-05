const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateMobileNumber: { type: String },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  locality: { type: String, required: true },
  landmark: { type: String },
  district: { type: String },
  city: { type: String },
  state: { type: String },
  isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model("address", AddressSchema);
module.exports = Address;