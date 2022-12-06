const User = require("../../models/User");
// const handleApiError = require("../../../utils/ErrorHandler");

//Create new User
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send({ message: "Succesfully added user" });
  } catch (error) {
    // handleApiError(res, error, "createUser");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(200).send([]);

    res.status(200).send(users);
  } catch (error) {
    // handleApiError(res, error, "getAllUsers");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) return res.status(400).send({ message: "Not a user" });

    res.status(200).send(user);
  } catch (error) {
    // handleApiError(res, error, "getUserById");
  }
};

exports.UpdateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    res.status(200).send(user);
  } catch (error) {
    // handleApiError(res, error, "UpdateUser");
  }
};

exports.DeleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params._id);
    res.status(200).send({ message: "User successfully deleted" });
  } catch (error) {
    // handleApiError(res, error, "DeleteUserById");
  }
};
