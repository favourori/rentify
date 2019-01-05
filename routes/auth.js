let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let _ = require("lodash");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let config = require("config");

//importing the Users Schema
let User = require("../models/users");

//validating a user

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email or password is invalid");

  let password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("email or password is invalid");

  //using JWT

  let token = jwt.sign({ id: user._id }, config.get("jwtPrivateKey"));

  res.send(token);
});

//exporting the router
module.exports = router;
