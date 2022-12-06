
const userValidation = require("../../utils/middlewares/UserAuthentication")
module.exports = app => {
    const DepositControllers = require("../controllers/user/userDepositController");
  
  
    app.post("/deposit",userValidation("BUYER") ,DepositControllers.deposit);
  
  
  
    app.patch("/reset",userValidation("BUYER") ,DepositControllers.reset);
  }