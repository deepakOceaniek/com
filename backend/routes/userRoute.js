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
  updateAdminProfile,
  getAllAddress,
  getAddressDetails,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRoles,
  isAuthenticatedAdmin,
} = require("../middleware/auth");

router.route("/login").get(optVerify);
router.route("/verify").get(loginUser);

// router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/admin/register").post(registerAdmin);
// router.route("/password/forgot").post(forgetPassword);
// router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/me/update").put(isAuthenticated, updateProfile);
// router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/address").get(isAuthenticated, getAllAddress);
router.route("/address").post(isAuthenticated, addUserAddress);
router
  .route("/address/:id")
  .get(isAuthenticated, getAddressDetails)
  .put(isAuthenticated, updateUserAddress)
  .delete(isAuthenticated, deleteUserAddress);

router
  .route("/admin/me")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAdminDetails);
router
  .route("/admin/me/update")
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateAdminProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedAdmin, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deleteUser);
module.exports = router;
