const Product = require("../../models/Product");
const User = require("../../models/User");
const handleApiError = require("../../../utils/middlewares/ErrorHandler");



/* Buy Product function
handle product availability cases 
handle user deposit amount relative to cost case
call the function getChange to return change for user if any
*/
exports.BuyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product || product.amountAvailable < req.body.amountRequested)
      return res.status(400).send({ message: "Product is not available" });

    const cost = product.cost * req.body.amountRequested;

    if (req.body.user.user.deposit < cost)
      return res.status(400).send({ message: "insufficient funds" });

    product.amountAvailable -= req.body.amountRequested;
    const user = await User.findById(req.body.user.user._id);

    let result = getChange(cost, user.deposit);
    const change = result[0];
    const deposit = result[1];

    user.deposit = deposit;

    await product.save();
    await user.save();

    res.status(200).send({
      totalSpent: cost,
      change: change,
      productName: product.productName,
      remainingDeposit: deposit,
    });

  } catch (error) {
    handleApiError(res, error, "createUser");

  }

};

/*
get the diff between deposited value and cost
check if this diff is less than 5 so return no change and add the diff to the user deposit wallet
if diff is more than 100 then push 100 as a change and check for the remaining diff
check if the diff is included in the change acceptedValues array 
return change as an array of values if any and return the remaining deposit in the user's deposit
*/
const getChange = (cost, deposit) => {
  let remainingWallet = 0;
  let diff = deposit - cost
  var change = [];
  const acceptedValues = [5, 10, 20, 50, 100];

  let i = 0;
  while (i < acceptedValues.length) {

    if (diff < 5) {
      remainingWallet += diff
      return [change, remainingWallet];
    }
    if (diff >= 100) {
      change.push(100);
      diff -= 100;
      i = 0;
    }
    if (acceptedValues[i] <= diff && diff < acceptedValues[i + 1]) {
      change.push(acceptedValues[i]);

      diff -= acceptedValues[i]
      i = 0;
    } else {
      i++;
    }
  }
}
