const Product = require("../Models/productModel");

// Create Product -- admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ sucess: true, product });
};
// get all product
exports.getAllProduct = async (req, res, next) => {
  const allProducts = await Product.find();
  res.status(200).json({ sucess: true, allProducts });
};
//Update product --admin
exports.updateProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      mesasge: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
};
