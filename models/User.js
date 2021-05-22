const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  password: String,
  username: String,
  name: String,
  descritption: String,
});

module.exports = User;
