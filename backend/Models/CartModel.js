const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    products: [
      {
        productId:mongoose.Schema.ObjectId, 
        quantity:{type:Number,
        default: 1},
        name: String,
        image:String,
        price: Number,
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);