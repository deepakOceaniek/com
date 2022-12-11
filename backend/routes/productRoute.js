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
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetails,
} = require("../controllers/productController");

router.route("/products").get(getAllProduct);
router.route("/admin/products").get(isAuthenticatedAdmin, getAdminProducts);
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
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllProductReviews)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteReview);

router.route("/allcategory").get(getAllCategory);
router
  .route("/admin/category/new")
  .post(isAuthenticatedAdmin, authorizeRoles("admin"), addCategory);
router
  .route("/admin/category/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getCategoryDetails)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteCategory);

module.exports = router;
