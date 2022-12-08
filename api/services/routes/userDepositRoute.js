
const userValidation = require("../../utils/middlewares/UserAuthentication")

/*
authentication is handled in the routes to check if the user is BUYER or not 
*/

module.exports = app => {
  const DepositControllers = require("../controllers/user/userDepositController");


  app.post("/deposit", userValidation("BUYER"), DepositControllers.deposit);



  app.patch("/reset", userValidation("BUYER"), DepositControllers.reset);
}