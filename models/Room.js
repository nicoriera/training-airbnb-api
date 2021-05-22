const mongoose = require("mongoose");

const Room = mongoose.model("Room", {
  email: String,
  password: String,
  username: String,
  name: String,
  descritption: String,
});

module.exports = Room;
