const mongoose = require("mongoose");

const SubCategoryShema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlength: [2, "too short subCategory name"],
      maxlength: [32, "too long subCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "CategoryModel",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

const SubCategoryModel = mongoose.model("SubcategoryModel", SubCategoryShema);
module.exports = SubCategoryModel;
