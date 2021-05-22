const mongoose = require("mongoose");

const Room = mongoose.model("Room", {
  photos: Array,
  title: String,
  descritpion: String,
  price: Number,
  location: Array,
});

module.exports = Room;
