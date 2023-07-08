const express = require("express");
const {
  getCategoryValidator,
  creatCategoryValidator,
  UpdateCategoryValidator,
  DeleteCategoryValidator,
} = require("../utils/Validattors/CategoryValidator");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const subcategoryRoute = require("./SubCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(creatCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(UpdateCategoryValidator, updateCategory)
  .delete(DeleteCategoryValidator, deleteCategory);

module.exports = router;
