const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters "],
    minLength: [4, "Name Should have more than 4 characters "],
  },

  categoryImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});
module.exports = mongoose.model("Category", categorySchema);