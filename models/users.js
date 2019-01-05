let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 }
});

let User = mongoose.model("user", userSchema);

module.exports = User;
