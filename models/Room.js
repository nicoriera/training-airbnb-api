const mongoose = require("mongoose");

const Room = mongoose.model("Room", {
  title: String,
  descritpion: String,
  price: Number,
  ratingValue: Number,
  reviews: Number,
  photos: [Object],
  location: [Number],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Room;
