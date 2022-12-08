const { findByIdAndUpdate } = require("../../models/User");
const User = require("../../models/User");
const handleApiError = require("../../../utils/middlewares/ErrorHandler");


/*
user deposit function 
get the user and check if the deposited value is included in the acceptedValues array 
*/
exports.deposit = async (req, res) => {
    try {
        const acceptedValues = [2, 5, 10, 20, 50, 100];

        let depositAmount = req.body.depositAmount;
        let userId = req.body.user.user._id;

        if (!acceptedValues.includes(depositAmount))
            return res.status(400).send({ message: "The amount is invalid" });

        let user = await User.findById(userId);

        user.deposit += depositAmount;

        await user.save();

        res.status(200).send({ message: "Successfully added deposit" })
    } catch (error) {
        handleApiError(res, error, "createUser");

    }
};


/*
user reset function 
get the user and reset the deposit for the user to zero
*/
exports.reset = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(req.body.user.user._id);

        user.deposit = 0;

        await user.save();

        res.status(200).send({ message: "Successfully deposit has been reset" })
    } catch (error) {
        handleApiError(res, error, "createUser");

    }
};
