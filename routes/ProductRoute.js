const express = require("express");
const {
  getProductValidator,
  creatProductValidator,
  UpdateProductValidator,
  DeleteProductValidator,
} = require("../utils/Validattors/ProductValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/ProductService");

const router = express.Router();

router.route("/").get(getProducts).post(creatProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(UpdateProductValidator, updateProduct)
  .delete(DeleteProductValidator, deleteProduct);

module.exports = router;
