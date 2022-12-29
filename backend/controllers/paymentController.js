const catchAsyncErrors = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");

const crypto = require("crypto");
const Payment = require("../Models/paymentModel");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

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

exports.paymentVerification = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(req.body);
  // console.log(req.headers);
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  console.log(`${expectedSignature}-----------------${razorpay_signature}`);

  if (isAuthentic) {
    // TODO : check payment is success dataBase
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

exports.webhookCapture = catchAsyncErrors(async (req, res, next) => {
  if (req.body.event == "payment.captured") {
    const { id, order_id } = req.body.payload.payment.entity;
    const razorpay_order_id = order_id;
    const razorpay_payment_id = id;
    const razorpay_signature = req.headers["x-razorpay-signature"];

    // console.log(razorpay_order_id);
    // console.log(razorpay_payment_id);
    console.log(req.body);
    console.log(req.body.payload);

    const isAuthentic = validateWebhookSignature(
      JSON.stringify(req.body),
      razorpay_signature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    console.log(isAuthentic);

    if (isAuthentic) {
      // TODO : check payment is success dataBase
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.status(200).json({
        success: "ok",
      });
    } else {
      res.status(400).json({
        success: false,
      });
    }
  }
});

exports.genrateInvoice = catchAsyncErrors(async (req, res, next) => {
  const options = {
  type: "invoice",
  date: 1589994898,
  customer_id: "cust_E7q0trFqXgExmT",
  line_items: [
    {
      "item_id": "item_DRt61i2NnL8oy6"
    }
  ]
}
  const invoice = await instance.invoices.create(options);
  console.log(invoice);

  res.status(200).json({
    success: true,
    invoice,
  });
});
