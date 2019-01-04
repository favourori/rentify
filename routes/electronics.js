let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//category Schema
// let categorySchema = mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   dateOfCreation: { type: Date, default: Date.now },
//   isPublished: Boolean
// });

//creating the Electonics schema

let electronicSchema = mongoose.Schema({
  name: { type: String, required: true },
  dailyRentalFee: String,
  description: String,
  keywords: [String],
  serialNumber: String,
  productionYear: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  numberInStock: Number
});

//Electronics Scheme ends here..

//the electronics model

let Electronics = mongoose.model("electronic", electronicSchema);

//getting all electronics

router.get("/", (req, res) => {
  Electronics.find()
    .populate("category")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

//getting a single electronics device

router.get("/:id", (req, res) => {
  res.status(200).send(req.params.id);
});

//creating an electronic device

router.post("/", (req, res) => {
  let electronic = new Electronics({
    name: req.body.name,
    dailyRentalFee: req.body.dailyRentalFee,
    description: req.body.description,
    keywords: req.body.keywords,
    serialNumber: req.body.serialNumber,
    productionYear: req.body.productionYear,
    category: req.body.category,
    numberInStock: req.body.numberInStock
  });

  electronic
    .save()
    .then(newData => {
      res.status(200).send(newData);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

module.exports = router;
