const express = require("express");
const router = express.Router();
const {
    isAuthenticated,
    authorizeRoles,
    isAuthenticatedAdmin,
} = require("../middleware/auth");
const { createTest, getAllTest, getAdminTest, getTestDetails, updateTest, deleteTest, createPakage, getAllPackage, getAdminPackage, getPackageDetails, updatePackage, deletePackage, createPackageReview, getAllPackageReviews, deletePackageReview, getAllLabCategory, addLabCategory, getLabCategoryDetails, updateLabCategory, deleteLabCategory } = require("../controllers/testController");

//Test
router.route("/test/new").post(isAuthenticatedAdmin,authorizeRoles("admin"),createTest)
router.route("/test").get(isAuthenticated,getAllTest)
router.route("/admin/test").get(isAuthenticatedAdmin,authorizeRoles("admin"),getAdminTest)
router.route("/test/:id").get(isAuthenticated,getTestDetails)
.put(isAuthenticatedAdmin,authorizeRoles("admin"),updateTest)
.delete(isAuthenticatedAdmin,authorizeRoles("admin"),deleteTest)

//Package
router.route("/package/new").post(isAuthenticatedAdmin,authorizeRoles("admin"),createPakage)
router.route("/package").get(isAuthenticated,getAllPackage)
router.route("/admin/package").get(isAuthenticatedAdmin,authorizeRoles("admin"),getAdminPackage)
router.route("/package/:id").get(isAuthenticated,getPackageDetails)
.put(isAuthenticatedAdmin,authorizeRoles("admin"),updatePackage)
.delete(isAuthenticatedAdmin,authorizeRoles("admin"),deletePackage)

//Test reviews
router.route("/testreview").put(isAuthenticated, createPackageReview);
router
  .route("/testreviews")
  .get(isAuthenticatedAdmin, authorizeRoles("admin"), getAllPackageReviews)
  .delete(isAuthenticatedAdmin, authorizeRoles("admin"), deletePackageReview);


router.route("/labcategory").get(isAuthenticated,getAllLabCategory)
router.route("labcategory").post(isAuthenticatedAdmin,authorizeRoles("admin"),addLabCategory)
router.route("labcategory/:id").get(isAuthenticatedAdmin,authorizeRoles("admin"),getLabCategoryDetails)
.put(isAuthenticatedAdmin,authorizeRoles("admin"),updateLabCategory)
.delete(isAuthenticatedAdmin,authorizeRoles("admin"),deleteLabCategory)

module.exports = router;