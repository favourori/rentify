let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let _ = require("lodash");
let bcrypt = require("bcrypt");

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
      //selecting what to send back in the response
      let response = _.pick(newUser, ["_id", "name", "email"]);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

//exporting the router
module.exports = router;
