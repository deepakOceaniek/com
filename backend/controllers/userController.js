const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

//Register Admin
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const profileMyCloud = await cloudinary.v2.uploader.upload(
    req.body.profileImage,
    {
      folder: "profileImage",
      width: 150,
      crop: "scale",
    }
  );
  const certificateMyCloud = await cloudinary.v2.uploader.upload(
    req.body.certificateImage,
    {
      folder: "certificateImage",
      width: 150,
      crop: "scale",
    }
  );

  const { category, name, contact, address, fromTime, toTime, status } =
    req.body;
  const admin = await Admin.create({
    category,
    name,
    contact,
    address,
    profileImage: {
      public_id: profileMyCloud.public_id,
      url: profileMyCloud.secure_url,
    },
    certificateImage: {
      public_id: certificateMyCloud.public_id,
      url: certificateMyCloud.secure_url,
    },
    fromTime,
    toTime,
    status,
  });
  sendToken(admin, 201, res);
});

//Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
  // const { name, email, password } = req.body;
  // console.log(name, email, password);
  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   avatar: {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   },
  // });
  // sendToken(user, 201, res);

  const { name, contact } = req.body;
  console.log(name, contact);
  if (!name || !contact) {
    return next(new ErrorHandler("Please fill the all entries", 400));
  }

  const userExist = await User.findOne({ contact: contact });

  if (userExist) {
    return next(new ErrorHandler("Successfully registered", 400));
  } else {
    const user = await User.create({
      name,
      contact,
    });
    sendToken(user, 201, res);
  }
});

//**  login phoneNumber and channel(sms/call) **
exports.optVerify = catchAsyncErrors(async (req, res, next) => {
  const contact = req.query.phonenumber;
  const user = await User.findOne({ contact });
  if (!user) {
    return next(new ErrorHandler("Invalid Please Register ", 400));
  }
  const admin = await Admin.findOne({ contact });
  if (!user) {
    return next(new ErrorHandler("Invalid Please Register ", 400));
  }
  const optreq = await client.verify
    .services(process.env.SERVICEID)
    .verifications.create({
      to: `+${req.query.phonenumber}`,
      channel: req.query.channel,
    });
  if (optreq) {
    res.status(200).send(optreq);
  }
});

//**  verify phonenumber and code**
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const verified = await client.verify
    .services(process.env.SERVICEID)
    .verificationChecks.create({
      to: `+${req.query.phonenumber}`,
      code: req.query.code,
    });
  if (verified) {
    const loginUserExist = await User.findOne({
      contact: `+${req.query.phonenumber}`,
    });
    sendToken(verified, 200, res);
  } else {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }
});
// //Login User
// exports.loginUser = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;
//   //Checking if user has given password and email both
//   if (!email || !password) {
//     return next(new ErrorHandler("Please Enter Eamail and password ", 400));
//   }
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return next(new ErrorHandler("Invalid email or password ", 401));
//   }
//   const isPasswordMatched = await user.comparePassword(password);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid email or password ", 401));
//   }
//   sendToken(user, 200, res);
// });

// Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// // Forgot password
// exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }
//   // Get ResetPassword Token
//   const resetToken = user.getResetPasswordToken();
//   await user.save({ validateBeforeSave: false });

//   // const resetPasswordUrl = `${req.protocol}://${req.get(
//   //   // set krne pe ye link aayega  user ko
//   //   "host"
//   // )}/api/v1/password/reset/${resetToken}`;
//   //FRONTEND_URL="http://localhost:3000"

//   const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

//   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email than please report it`; // message vo hai jo hum email mai bhjenge

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Bandor Password Recovery",
//       message,
//     });
//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// // Reset Password
// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
//   //Creating token hash
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(
//       new ErrorHandler(
//         "Reset Password Token is invalid or has been expired",
//         400
//       )
//     );
//   }
//   if (req.body.password !== req.body.confirmPassword) {
//     return next(new ErrorHandler("Password does not password", 400));
//   }
//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;
//   await user.save();

//   sendToken(user, 200, res);
// });

//Get User Details --User Own Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});
//Get User Details --User Own Details
exports.getAdminDetails = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user.id);
  const user = await Admin.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// //Update User Password
// exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("+password");

//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Old password is incorrect ", 400));
//   }
//   if (req.body.newPassword !== req.body.confirmPassword) {
//     return next(new ErrorHandler("Password Does Not Match", 400));
//   }
//   user.password = req.body.newPassword;
//   await user.save();

//   sendToken(user, 200, res);
// });

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    contact: req.body.contact,
  };
  // // Cloudinary
  // if (req.body.avatar !== "") {
  //   const user = await User.findById(req.user.id);
  //   const imageId = user.avatar.public_id;

  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  //   newUserData.avatar = {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   };
  // }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(user);
  res.status(200).json({ success: true });
});

//Update Admin Profile
exports.updateAdminProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    category: req.body.category,
    name: req.body.name,
    contact: req.body.contact,
    address: req.body.address,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    status: req.body.status,
  };
  // Cloudinary
  if (req.body.profileImage !== "") {
    const user = await Admin.findById(req.user.id);
    const imageId = user.profileImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const profileMyCloud = await cloudinary.v2.uploader.upload(
      req.body.profileImage,
      {
        folder: "profileImage",
        width: 150,
        crop: "scale",
      }
    );

    newUserData.profileImage = {
      public_id: profileMyCloud.public_id,
      url: profileMyCloud.secure_url,
    };
  }
  if (req.body.certificateImage !== "") {
    const user = await Admin.findById(req.user.id);
    const imageId = user.certificateImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const certificateMyCloud = await cloudinary.v2.uploader.upload(
      req.body.certificateImage,
      {
        folder: "avatars",
        width: 150,
        crop: "scale",
      }
    );

    newUserData.certificateImage = {
      public_id: certificateMyCloud.public_id,
      url: certificateMyCloud.secure_url,
    };
  }
  const user = await Admin.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(user);
  res.status(200).json({ success: true });
});

// Get all Users (Admin Can Access)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User (Admin Can Access)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Role  --admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // let user = User.findById(req.params.id);

  // if (!user) {
  //   return next(
  //     new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`, 400)
  //   );
  // }
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

//Delete User --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  // We will remove cloudinary later

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});
