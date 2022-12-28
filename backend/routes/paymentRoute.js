// const express = require("express");
// const router = express.Router();
// const { isAuthenticated } = require("../middleware/auth");
// const {
//   processPayment,
//   sendStripeApiKey,
// } = require("../controllers/paymentController");
// router.route("/payment/process").post(isAuthenticated, processPayment);

// router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

// module.exports = router;

const express = require("express");
const {
  checkout,
  paymentVerification,
  webhookCapture,
} = require("../controllers/paymentController.js");

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/webhook").post(webhookCapture);

module.exports = router;
