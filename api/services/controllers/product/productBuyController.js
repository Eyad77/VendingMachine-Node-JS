const e = require("express");
const Product = require("../../models/Product");
const User = require("../../models/User");

exports.BuyProduct = async (req, res) => {
  const acceptedValues = [2, 5, 10, 20, 50, 100];

  const product = await Product.findById(req.body.productId);

  if (!product || product.amountAvailable < req.body.amountRequested)
    return res.status(400).send({ message: "Product is not available" });

  const cost = product.cost * req.body.amountRequested;

  if (req.body.user.user.deposit < cost)
    return res.status(400).send({ message: "insufficient funds" });

  product.amountAvailable -= req.body.amountRequested;
  const user = await User.findById(req.body.user.user._id);
  let diff = user.deposit - cost;
  let change = 0;

  if (diff % 2 == 0) {
    change = diff;
    user.deposit = 0;
  } else {
    for (let i = 0; i < acceptedValues.length; i++) {
      if (acceptedValues[i] < diff && acceptedValues[i + 1] > diff) {
        change += acceptedValues[i];
        diff -= change;
      }
      if (diff % 2 == 0) {
        change = diff;
        break;
      } else {
        user.deposit -= diff;
      }
    }
  }

  await product.save();
  await user.save();

  res.status(200).send({
    totalSpent: cost,
    change: change,
    productName: product.productName,
    remainingDeposit: user.deposit,
  });
};
