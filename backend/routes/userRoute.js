const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgetPassword,
} = require("../controllers/userController");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
// router
//   .route("/products/:id")
//   .put(updateProduct)
//   .delete(deleteProduct)
//   .get(getProductDetails);
router.route("/password/forgot").post(forgetPassword);
router.route("/logout").get(logout);

module.exports = router;
