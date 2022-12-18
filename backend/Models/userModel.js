const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters "],
    minLength: [4, "Name Should have more than 4 characters "],
  },
  contact: {
    type: Number,
    required: [true, "please Enter Your Contact Number"],
  },
  userAddresses: [
    {
      // user: {
      //   type: mongoose.Schema.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      contact: {
        type: Number,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  token: {
    type: String,
    // required: true,
  },
});

// JWT TOKEN
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

userSchema.methods.getJWTToken = function () {
  let newGenrateToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.token = newGenrateToken;
  this.save();
  return newGenrateToken;
};

// store address
userSchema.methods.addMessage = async function (
  address,
  city,
  area,
  state,
  pinCode,
  contact
) {
  try {
    console.log("message called");

    this.userAddresses = this.userAddresses.concat({
      address,
      city,
      area,
      state,
      pinCode,
      contact,
    }); //both key and value same than we have to write once
    await this.save();
    return this.userAddresses;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);
