let express = require("express");
let router = express.Router();

//the routes:
router.get("/", (req, res) => {
  res.send("Welcome to the Users route..");
});

//exporting the router
module.exports = router;
