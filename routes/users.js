let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//creating the schema to create users

let userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

let User = mongoose.model("user", userSchema);

//The routes:

//Getting all users

router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

//Creating a new user

router.post("/", (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user
    .save()
    .then(newUser => {
      res.status(200).send(newUser);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

//exporting the router
module.exports = router;
