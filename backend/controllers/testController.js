const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const Test = require("../Models/testModel")
const Package = require("../Models/packageTestModel")
const LabCategory = require("../Models/labCategory");

// Create Test --admin
exports.createTest = catchAsyncErrors(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "tests",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const test = await Test.create(req.body);
  
    res.status(201).json({
      success: true,
      test,
    });
  });


  //Get all test
  exports.getAllTest = catchAsyncErrors(async (req, res, next) => {
    // return next(new ErrorHandler("This Is My Temp Error", 500));
  
    const resultPerPage = 8;
    const TestCount = await Test.countDocuments();
    // console.log(req.query);
  
    const apiFeatures = new ApiFeatures(Test.find(), req.query)
      .search()
      .filter();
  
    let tests = await apiFeatures.query;
    let filteredTestCount = tests.length;
  
    apiFeatures.pagination(resultPerPage);
    console.log(tests)
    console.log(tests.length)
    if(tests.length >0){
    tests = await apiFeatures.query.clone();
    }else{
      return next(new ErrorHandler("Product not found",400));
    }
    // console.log(tests);
    // console.log(filteredTestCount);
  
    res.status(200).json({
      success: true,
      tests,
      productsCount,
      resultPerPage,
      filteredTestCount,
    });
  });

// Get All Test --Admin
exports.getAdminTest = catchAsyncErrors(async (req, res, next) => {
    const tests = await Test.find();
  
    res.status(200).json({
      success: true,
      tests,
    });
  });

// Get Test details
exports.getTestDetails = catchAsyncErrors(async (req, res, next) => {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, test });
  });

//Update Test --Admin
exports.updateTest = catchAsyncErrors(async (req, res, next) => {
    let test = Test.findById(req.params.id);
    if (!test) {
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
    for (let i = 0; i < test.images.length; i++) {
      await cloudinary.v2.uploader.destroy(test.images[i].public_id);
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "tests",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  }
  
    test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, test });
  });

// Delete Test --Admin
exports.deleteTest = catchAsyncErrors(async (req, res, next) => {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    //Deleting Images from Cloudinary
    for(let i=0 ;i< test.images.length;i++){
       await cloudinary.v2.uploader.destroy(test.images[i].public_id)
    }
  
    await test.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });
  });











  







// Create package --admin
  exports.createPakage = catchAsyncErrors(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "packages",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const package = await Package.create(req.body);
  
    res.status(201).json({
      success: true,
      package,
    });
  });

  // Get all package
  exports.getAllPackage = catchAsyncErrors(async (req, res, next) => {
    // return next(new ErrorHandler("This Is My Temp Error", 500));
  
    const resultPerPage = 8;
    const packageCount = await Package.countDocuments();
    // console.log(req.query);
  
    const apiFeatures = new ApiFeatures(Package.find(), req.query)
      .search()
      .filter();
  
    let packages = await apiFeatures.query;
    let filteredPackageCount = packages.length;
  
    apiFeatures.pagination(resultPerPage);
    console.log(packages)
    console.log(packages.length)
    if(packages.length >0){
    packages = await apiFeatures.query.clone();
    }else{
      return next(new ErrorHandler("Product not found",400));
    }
    // console.log(packages);
    // console.log(filteredPackageCount);
  
    res.status(200).json({
      success: true,
      packages,
      packageCount,
      resultPerPage,
      filteredPackageCount,
    });
  });


  // Get All Package --Admin
exports.getAdminPackage = catchAsyncErrors(async (req, res, next) => {
    const packages = await Package.find();
  
    res.status(200).json({
      success: true,
      packages,
    });
  });


// Get package details
exports.getPackageDetails = catchAsyncErrors(async (req, res, next) => {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, package });
  });


  //Update Package --Admin
exports.updatePackage = catchAsyncErrors(async (req, res, next) => {
    let package = Package.findById(req.params.id);
    if (!package) {
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
    for (let i = 0; i < package.images.length; i++) {
      await cloudinary.v2.uploader.destroy(package.images[i].public_id);
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "packages",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  }
  
    package = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, package });
  });


// Delete Package --Admin
exports.deletePackage = catchAsyncErrors(async (req, res, next) => {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    //Deleting Images from Cloudinary
    for(let i=0 ;i< package.images.length;i++){
       await cloudinary.v2.uploader.destroy(package.images[i].public_id)
    }
  
    await package.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });
  });


// Create new Review or Update the Review for package
exports.createPackageReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, packageId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const package = await Package.findById(packageId);
  
    const isReviewed = package.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      package.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString())
          review.rating = rating;
        review.comment = comment;
      });
    } else {
      package.reviews.push(review);
      package.numOfReviews = package.reviews.length;
    }
    let avg = 0;
    package.reviews.forEach((review) => {
      avg += review.rating;
    });
    package.ratings = avg / package.reviews.length;
  
    await package.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });


  
// Get All Reviwes of a single Package
exports.getAllPackageReviews = catchAsyncErrors(async (req, res, next) => {
    const package = await Package.findById(req.query.id);
    if (!package) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      reviews: package.reviews,
    });
  });



  
// Delete Package Reviwes
exports.deletePackageReview = catchAsyncErrors(async (req, res, next) => {
    const package = await Package.findById(req.query.packageId);
    if (!package) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = package.reviews.filter((review) => {
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
      ratings = (package.ratings = avg / reviews.length);
    }
    const numOfReviews = reviews.length;
    const up = await Package.findByIdAndUpdate(
      req.query.packageId,
      { reviews, ratings, numOfReviews },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
    });
  });
  

  // All Lab Category 
exports.getAllLabCategory = catchAsyncErrors(async (req, res, next) => {
    const labCategory = await LabCategory.find();
  
  
    res.status(200).json({
      success: true,
      labCategory,
    });
  });


  // Add Lab Category ---admin 
exports.addLabCategory = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "labCategory",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    // req.body.user = req.user.id;
  
    const labCategory = await LabCategory.create(req.body);
  
    res.status(201).json({
      success: true,
      labCategory,
    });
  });

  // Get LabCategory details
exports.getLabCategoryDetails = catchAsyncErrors(async (req, res, next) => {
    const labCategory = await LabCategory.findById(req.params.id);
    if (!labCategory) {
      return next(new ErrorHandler("Category not found", 404));
    }
    res.status(200).json({ success: true, labCategory });
  });


  
//Update Lab Category --Admin
exports.updateLabCategory = catchAsyncErrors(async (req, res, next) => {
    let labCategory = LabCategory.findById(req.params.id);
    if (!labCategory) {
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
    for (let i = 0; i < labCategory.images.length; i++) {
      await cloudinary.v2.uploader.destroy(labCategory.images[i].public_id);
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "labCategory",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }
    labCategory = await LabCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, labCategory });
  });

  
// Delete lab Category --Admin
exports.deleteLabCategory = catchAsyncErrors(async (req, res, next) => {
    const labCategory = await LabCategory.findById(req.params.id);
    if (!labCategory) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    //Deleting Images from Cloudinary
    for(let i=0 ;i< labCategory.images.length;i++){
       await cloudinary.v2.uploader.destroy(labCategory.images[i].public_id)
    }
  
    await labCategory.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfully" });
  });
  
  