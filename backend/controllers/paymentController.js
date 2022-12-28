const catchAsyncErrors = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../Models/paymentModel");
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.checkout = catchAsyncErrors(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  console.log(order);

  res.status(200).json({
    success: true,
    order,
  });
});

//  webhookCapture
// exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   console.log(`webHook Console ${razorpay_signature}`);
//   console.log(`webHook Console ${razorpay_payment_id}`);
//   console.log(`webHook Console ${razorpay_order_id}`);
//   // console.log(`webHook Console ${webhookSecret}`);
//   // console.log(`webHook Console ${webhookSignature}`);


// validateWebhookSignature(JSON.stringify(req.body), razorpay_signature, "abcdefghijklmnopqrstuvwxyz")


// key                = "abcdefghijklmnopqrstuvwxyz"
// message            = req.body // raw webhook request body
// received_signature = razorpay_signature

// expected_signature = hmac('sha256', message, key)

// if (expected_signature != received_signature){
// console.log("invalid")
// } else{
//   console.log("valid")
// }
// });

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
//  const expectedSignature = hmac('sha256', req.body,  process.env.RAZORPAY_WEBHOOK_SECRET)

  const isAuthentic = expectedSignature === razorpay_signature;

  console.log(`${expectedSignature}-----------------${razorpay_signature}`)

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    res.status(200).json({
      success: "ok",
    });
    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});
