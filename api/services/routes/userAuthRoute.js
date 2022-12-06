

module.exports = app => {
    const userAuthControllers = require("../controllers/user/userAuthController");
  
  
    app.post("/user/auth", userAuthControllers.signInUser);
  
    
  }