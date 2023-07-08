const mongoose = require("mongoose");
// 1- Create Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "product required"],
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      requried: [true, "product description is required"],
      minlength: [20, "too short product desscription"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [20, "too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    color: [String],
    imageCover: {
      type: String,
      required: [true, "product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "CategoryModel",
      required: [true, "product must belong to Category"],
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubcategoryModel",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "BrandModel",
    },
    ratingAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 1.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 2- Create model
const productModel = mongoose.model("productModel", productSchema);

module.exports = productModel;
