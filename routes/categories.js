let express = require("express");
let Joi = require("joi");
let router = express.Router();
let mongoose = require("mongoose");

//creating the schema for the categories:
let categoriesShema = mongoose.Schema({
  name: String,
  dateOfCreation: { type: Date, default: Date.now },
  isPublished: Boolean
});

let Category = mongoose.model("Category", categoriesShema);

//creating the index route...
router.get("/categories", (req, res) => {
  Category.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.send(err.message);
    });
});

//creating a new category
router.post("/categories", (req, res) => {
  //creating a new category
  let category = new Category({
    name: req.body.name,
    isPublished: true
  });

  category
    .save()
    .then(savedData => {
      res.status(200).send(savedData);
    })
    .catch(err => {
      res.send(err.message);
    });
});

//editting a category
router.put("/categories/:id", (req, res) => {
  res.send("This is the put/edit category route");
});

//deleting a category
router.delete("/categories/:id", (req, res) => {
  res.send("this is the delete category route");
});

module.exports = router;
