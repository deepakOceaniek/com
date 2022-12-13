const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const prescriptionSchema = mongoose.Schema({
  
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },

      prescriptionImage : {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },

  createdAt: {
    type: Date,
    default: Date.now,
  },


});



module.exports = mongoose.model("Prescription", prescriptionSchema);
