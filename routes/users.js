let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let _ = require("lodash");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let config = require("config");
//importing the Users Schema
let User = require("../models/users");

//Creating a new user

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user
    .save()
    .then(newUser => {
      //setting the token
      let token = jwt.sign({ id: user._id }, config.get("jwtPrivateKey"));

      //selecting what to send back in the response
      let response = _.pick(newUser, ["_id", "name", "email"]);
      res
        .header("x-auth-token", token)
        .status(200)
        .send(response);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

//exporting the router
module.exports = router;
