const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  // forgetPassword,
  // resetPassword,
  getUserDetails,
  // updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  optVerify,
  registerAdmin,
  getAdminDetails,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/login").get(optVerify);
router.route("/verify").get(loginUser);

// router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/admin/register").post(registerAdmin);
// router.route("/password/forgot").post(forgetPassword);
// router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/admin/me").get(isAuthenticated, getAdminDetails);
// router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);
module.exports = router;
