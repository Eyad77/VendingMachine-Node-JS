
const userValidation = require("../../utils/middlewares/UserAuthentication")

/*
authentication is handled in the routes to check if the user is BUYER or not 
*/

module.exports = app => {
  const ProductBuyController = require("../controllers/product/productBuyController");


  app.post("/buy", userValidation("BUYER"), ProductBuyController.BuyProduct);


}