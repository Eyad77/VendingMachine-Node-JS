
const userValidation = require("../../utils/middlewares/UserAuthentication")
module.exports = app => {
    const ProductBuyController = require("../controllers/product/productBuyController");
  
  
    app.post("/buy",userValidation("BUYER") ,ProductBuyController.BuyProduct);
  

  }