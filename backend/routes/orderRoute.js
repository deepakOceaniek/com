const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const { newOrder } = require("../controllers/orderControllers");
const { mapReduce } = require("../models/userModel");

router.route("/order/new").post(isAuthenticated, newOrder);

module.exports = router;
