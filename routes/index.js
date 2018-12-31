let express = require("express");
let routes = express.Router();

routes.get("/", (req, res) => {
  res.send("<h2>Rentify.</h2>Simple API that lets you build an Electonics Renting App <small></small>");
});

module.exports = routes;
