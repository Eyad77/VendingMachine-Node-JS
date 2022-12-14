const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// initialize express app
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Enable CORS for all HTTP methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    exposedHeaders: "X-Auth-Token",
  })
);

require("./api/services/routes/productRoute")(app);
require("./api/services/routes/userRoute")(app);
require("./api/services/routes/userAuthRoute")(app);
require("./api/services/routes/userDepositRoute")(app);
require("./api/services/routes/productBuyRoute")(app);


mongoose.Promise = global.Promise;

// Connecting to the database

mongoose
  .connect("mongodb+srv://eyad:eyad123@cluster0.o56vmix.mongodb.net/VendingMachineDb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
mongoose.connection.on("error", function (error) {
  console.error("Database connection error:", error);
});

mongoose.connection.once("open", function () {
  console.log("Database connected");

});

app.listen(3000, () => {
  console.log("Server is up and running on port number " + 3000);
});
