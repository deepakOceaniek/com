const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(fileUpload());

//Config
dotenv.config({ path: "backend/config/config.env" });

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware For error
app.use(errorMiddleware);
module.exports = app;
