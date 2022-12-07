const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");

router.route("/products").get(getAllProduct);
router
  .route("/admin/products")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getAllProductReviews)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
