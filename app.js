let express = require("express");
let bodyParser = require("body-parser");
let app = express();



//importing routes
let indexRoutes = require("./routes/index");
let gadgetRoutes = require("./routes/electronics");
let categoriesRoutes = require("./routes/categories");
let mongoose = require("mongoose");
let cors = require("cors");
app.use(cors());

mongoose
  .connect("mongodb://favourtheo:1A2b3c--@ds149404.mlab.com:49404/rentify")
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch(err => {
    console.log("Oops could not connect to mongo db! ", err.message);
  });

//middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Get the Index route;
app.use("/", indexRoutes);

//Getting the categories routes
app.use("/api/electronics", categoriesRoutes);
app.use("/api/electronics", gadgetRoutes);

//Start server
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
