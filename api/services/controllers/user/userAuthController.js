const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const handleApiError = require("../../../utils/middlewares/ErrorHandler");

/*
user signIn function  
get the user and sign a jwt token with the user role in it whether BUYER or SELLER
*/

exports.signInUser = async (req, res) => {
  try {
    // Request body has name and password
    const name = req.body.name;
    const password = req.body.password;
    // Verify name and password exist in the users collection
    const user = await User.findOne({ name: name, password: password });

    if (!user)
      return res
        .status(403)
        .send({ message: "Email or Password are not correct" });

    // If verified Sign in and return jwt token

    jwt.sign({ user: user }, `hashkey`, async (err, token) => {
      res.status(200).send({ userInfo: user, token: token });
    });
  } catch (error) {
    handleApiError(res, error, "getAllUsers");

  }
};
