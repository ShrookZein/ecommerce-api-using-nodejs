const express = require("express");

const {
  creatSubCategoryValidator,
  getSubCategoryValidator,
  UpdateSubCategoryValidator,
  DeleteSubCategoryValidator,
} = require("../utils/Validattors/SubCategoryValidator");

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  creaeFilterObject,
} = require("../services/SubcategoryService");

//mergeParams: allow us to access params on other routers
//We need to access categoryId from categoryRouter
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(creaeFilterObject, getSubCategories)
  .post(setCategoryIdToBody, creatSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(UpdateSubCategoryValidator, updateSubCategory)
  .delete(DeleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
