

module.exports = app => {
    const userControllers = require("../controllers/user/userBasicController");
  
  
    app.post("/user", userControllers.createUser);
  
    app.get("/user", userControllers.getAllUsers);
  
    app.get("/user/:_id", userControllers.getUserById);
  
    app.put("/user", userControllers.UpdateUser);
  
    app.delete("/user/:_id", userControllers.DeleteUserById)
  }