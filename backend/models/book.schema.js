const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide book name"],
    trim: true,
    maxlength: [70, "Book name should not be more than 70 characters"],
  },
  price: {
    type: Number,
    required: [true, "please provide Book price"],
    maxlength: [5, "Book price should not be more than 5 digits"],
  },
  description: {
    type: String,
    required: [true, "please provide book description"],
  },
  photos: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "please select category from- Novel, Biography, SelfHelp, Tech  ",
    ],
    enum: {
      values: ["Novel", "Biography", "SelfHelp", "Tech"],
      message:
        "please select category ONLY from - Novel, Biography, SelfHelp, Tech ",
    },
  },
  
  stock: {
    type: Number,
    required: [true, "please add a number in stock"],
  },

 },

 {
    timestamps: true,
 }
 
 );

module.exports = mongoose.model("Book", bookSchema);
