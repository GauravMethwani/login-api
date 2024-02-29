// src/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^\d{10}$/.test(v);
    //   },
    //   message: 'Mobile number must be 10 digits.'
    // }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: function (v) {
    //     return /^\S+@\S+\.\S+$/.test(v);
    //   },
    //   message: 'Invalid email address.'
    // }
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: function (v) {
    //     return /^[a-zA-Z0-9]{8}$/.test(v);
    //   },
    //   message: 'Username must be alphanumeric and 8 characters long.'
    // }
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     // Password should be at least 6 characters, have 1 uppercase letter, 1 lowercase letter, and 1 special character
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/.test(v);
    //   },
    //   message: 'Password must be at least 6 characters, with 1 uppercase letter, 1 lowercase letter, and 1 special character.'
    // }
  },
  creationTime: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
  } catch (error) {
    // Handle bcrypt.compare error
    throw new Error("Error comparing passwords");
  }
};
const User = mongoose.model("Users", userSchema);

module.exports = User;
