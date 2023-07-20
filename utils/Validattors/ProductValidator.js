const { check } = require("express-validator");

const validatorMiddleware = require("../../Middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/SubCategoryModel");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];
exports.creatProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("title Product required")
    .isLength({ min: 3 })
    .withMessage("Too short Product name")
    .isLength({ max: 100 })
    .withMessage("Too long Product name"),
  check("description")
    .notEmpty()
    .withMessage("Product description required")
    .isLength({ max: 2000 })
    .withMessage("Too long Product name"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("price")
    .notEmpty()
    .withMessage("product price is required")
    .isNumeric()
    .withMessage("Product price must be number")
    .isLength({ max: 32 })
    .withMessage("too long Price"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("product priceAfterDiscount must be number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors must be array of string"),
  check("imageCover").notEmpty().withMessage("product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("product images must be array of string"),
  check("category")
    .notEmpty()
    .withMessage("product must be belong to parent category")
    .isMongoId()
    .withMessage("Invalid Category id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`no category for this id ${categoryId}`)
          );
        }
      })
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid Category id format")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          //length of result equal length of subcategories in body
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subcategoriesIds`));
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subcategoriesIdsInDB = [];
          subcategories.forEach((subcategory) => {
            subcategoriesIdsInDB.push(subcategory._id.toString());
          });
          //check if subcategories in DB is include subcategories in req.body ? (true) : false
          if (!val.every((v) => subcategoriesIdsInDB.includes(v))) {
            return Promise.reject(
              new Error(`subcategories mot belongs to category`)
            );
          }
        }
      )
    ),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid Category id format"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingAverage must be number")
    .isLength({ min: 1 })
    .withMessage("rating must be above or equal to 1")
    .isLength({ max: 5 })
    .withMessage("rating must be below or equal to 5"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingQuantity must be number"),
  validatorMiddleware,
];

exports.UpdateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];

exports.DeleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];
