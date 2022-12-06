const userValidation = require("../../utils/middlewares/UserAuthentication")

module.exports = app => {
  const productControllers = require("../controllers/product/productBasicController");


  app.post("/product", userValidation("SELLER"),productControllers.createProduct);

  app.get("/product", productControllers.getAllProducts);

  app.get("/product/:id", productControllers.getProductById);

  app.put("/product", userValidation("SELLER"),productControllers.UpdateProduct);

  app.delete("/product/:id",userValidation("SELLER"), productControllers.DeleteProductById)
}