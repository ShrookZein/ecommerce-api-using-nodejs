const express = require("express");
const {
  getBrandValidator,
  creatBrandValidator,
  UpdateBrandValidator,
  DeleteBrandValidator,
} = require("../utils/Validattors/BrandValidator");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/BrandService");

const router = express.Router();

router.route("/").get(getBrands).post(creatBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(UpdateBrandValidator, updateBrand)
  .delete(DeleteBrandValidator, deleteBrand);

module.exports = router;
