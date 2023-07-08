const { check } = require("express-validator");

const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];

exports.creatSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory name"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belong to parent category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];

exports.UpdateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];

exports.DeleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory id format"),
  validatorMiddleware,
];
