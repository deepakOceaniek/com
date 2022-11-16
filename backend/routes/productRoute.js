const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/products", getAllProduct);
router.post("/products/new", createProduct);
router.put("/products/:id", updateProduct);
module.exports = router;
