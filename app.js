let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let config = require("config");
//importing routes
let indexRoutes = require("./routes/index");
let gadgetRoutes = require("./routes/electronics");
let categoriesRoutes = require("./routes/categories");
let usersRoutes = require("./routes/users");
let auth = require("./routes/auth");

let mongoose = require("mongoose");
let cors = require("cors");
 
// if (!config.get("jwtPrivateKey")) {
//   console.log("JWT Private key not defined!");
//   process.exit(1);
// }

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
app.use("/api/users", usersRoutes);
app.use("/api/auth", auth);

//Start server
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
