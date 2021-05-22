const mongoose = require("mongoose");

const User = mongoose.model("User", {
  photos: Array,
  title: String,
  descritpion: String,
  price: Number,
  location: Array,
});

module.exports = User;
