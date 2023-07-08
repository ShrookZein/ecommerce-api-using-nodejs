const { check } = require("express-validator");

const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
exports.creatCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("name category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.UpdateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.DeleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
