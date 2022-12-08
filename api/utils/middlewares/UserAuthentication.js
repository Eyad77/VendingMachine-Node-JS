const jwt = require("jsonwebtoken");

/*
user authentication and authorization 
get the jwt token and verify it 
check for the role given in the function as permission 
*/

const checkPermission = (permission) => {
  return async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      // Verify the received token and verify the permission
      await jwt.verify(bearerToken, "hashkey", async (err, decoded) => {
        if (err) return res.status(403).send({ message: "Permission denied" });
        if (permission != decoded.user.role)
          return res.status(403).send({ message: "Incorrect user role" }); // Terminate the promised function on line 14

        req.body.user = decoded;

        next(); // If the flag is switched go to next middleware
      });
    } else {
      res.status(403).send({ message: "Permission denied" });
    }
  };
};

module.exports = checkPermission;
