const Product = require("../../models/Product");
//const handleApiError = require("../../../utils/ErrorHandler");

exports.createProduct = async (req, res) => {
  //try {
    req.body.sellerId = req.body.user.user._id
    const product = new Product(req.body);
    await product.save();
    res.status(200).send({ message: "Succesfully added product" });
  //} catch (error) {
    //handleApiError(res, error, "createProduct");
  //}
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.status(200).send([]);

    res.status(200).send(products);
  } catch (error) {
    //handleApiError(res, error, "getAllProducts");
  }
};

exports.getProductById = async (req, res) => {
  try {
    console.log(req.params.id)
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send({ message: "Not a product" });

    res.status(200).send(product);
  } catch (error) {
    //handleApiError(res, error, "getProductById");
  }
};

exports.UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    res.status(200).send(product);
  } catch (error) {
    //handleApiError(res, error, "UpdateProduct");
  }
};

exports.DeleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Product successfully deleted" });
  } catch (error) {
    //handleApiError(res, error, "DeleteProductById");
  }
};
