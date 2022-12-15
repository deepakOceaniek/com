const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
  // //   console.log(token);
  // if (!token) {
  //   return next(new ErrorHandler("Please Login to access this resource", 401));
  // }
  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // req.user = await User.findById(decodedData.id); // jab Tak login rehga request mai  se hum kabhi user ka deta access kar  sakte hai
  // next();

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);

  req.user = await User.findById(decodedData.id);
  console.log(req.user);

  next();
});

exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await Admin.findById(decodedData.id); // jab Tak login rehga request mai  se hum kabhi user ka deta access kar  sakte hai
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
