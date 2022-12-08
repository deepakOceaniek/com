const Product = require("../models/productModel");
const Category =require("../Models/categoryModel")

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof(req.body.images) === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get All Product
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This Is My Temp Error", 500));

  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  // console.log(req.query);

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultPerPage);

  products = await apiFeatures.query.clone();
  // console.log(products);
  // console.log(filteredProductsCount);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product --Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

//Update product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

// Images Start Here
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

// Delete Product --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //Deleting Images from Cloudinary
  for(let i=0 ;i< product.images.length;i++){
     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted Successfully" });
});

// Create new Review or Update the Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString())
        review.rating = rating;
      review.comment = comment;
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get All Reviwes of a single product
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Reviwes
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((review) => {
    avg += review.rating;
  });

  let ratings = 0
  
  if(reviews.length===0){
    ratings = 0
  }else{
    ratings = (product.ratings = avg / reviews.length);
  }
  const numOfReviews = reviews.length;
  const up = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
  });
});


// All Category 
exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.find();

  res.status(200).json({
    success: true,
    category,
  });
});

// Add Category ---admin 
exports.addCategory = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.categoryImage, {
    folder: "category",
    width: 150,
    crop: "scale",
  });
  const { categroyName} = req.body;
  console.log(categroyName);
  const category = await Category.create({
    categroyName,
    categoryImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
  });
});


//Update User Profile
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const newCategoryData = {
    categroyName: req.body.categroyName,
   
  };
  // Cloudinary
  if (req.body.categoryImage !== "") {
    const category = await Category.findById(req.user.id);
    const imageId = category.categoryImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.categoryImage, {
      folder: "categoryImage",
      width: 150,
      crop: "scale",
    });

    newCategoryData.categoryImage = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const category = await Category.findByIdAndUpdate(req.user.id, newCategoryData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(category);
  res.status(200).json({ success: true, category});
});

//Delete category --admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  // We will remove cloudinary later

  const category = await User.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorHandler(`Category Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = category.categoryImage.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await category.remove();
  res.status(200).json({ success: true, message: "Category deleted successfully" });
});