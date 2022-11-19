const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteReview,
} = require("../controllers/productController");

router.route("/products").get(getAllProduct);
router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getAllProductReviews)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
