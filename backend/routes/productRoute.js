const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProduct);
router
  .route("/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
