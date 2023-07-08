const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const SubCategory = require("../models/SubCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
  // nested route
  //@route   GET /api/v1/categories/:categoryId/subcategories
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc    Create subcategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const Subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: Subcategory });
});

// nested route
//@route   GET /api/v1/categories/:categoryId/subcategories
exports.creaeFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  // let filterObject = {};
  // if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const SubCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  // .populate({ path: "category", select: "name -_id" })
  res
    .status(200)
    .json({ results: SubCategories.length, page, data: SubCategories });
});

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await SubCategory.findById(id);
  // .populate({
  //   path: "category",
  //   select: "name -_id",
  // })
  if (!category) {
    // res.status(404).json({ msg: `No subcategory for this id ${id}` });
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Update specific Subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subcategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, category, slug: slugify(name) },
    { new: true }
  );

  if (!subcategory) {
    // res.status(404).json({ msg: `No category for this id ${id}` });
    return next(new ApiError(`No SubCategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @desc    Delete specific Subcategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (!subcategory) {
    // res.status(404).json({ msg: `No subcategory for this id ${id}` });
    return next(new ApiError(`No SubCategory for this id ${id}`, 404));
  }
  res.status(204).send();
});
