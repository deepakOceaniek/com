const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ sucess: true, product });
});

// Get All Product
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const allProducts = await apiFeatures.query;
  res.status(200).json({ sucess: true, productCount, allProducts });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

//Update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted Successfully" });
});
