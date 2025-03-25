const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
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
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String,  },
  phoneNumber: { type: String,  },
  gender: { type: String,  },
  email: { type: String,  },
  addresses: [addressSchema],   // Array of addresses
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
