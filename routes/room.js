const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Room = require("../models/Room");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/room/publish", isAuthenticated, async (req, res) => {
  if (
    req.fields.title &&
    req.fields.price &&
    req.fields.description &&
    req.fields.location
  ) {
    try {
      const locationTab = [req.fields.location.lat, req.fields.location.lng];
      const newRoom = new Room({
        title: req.fields.title,
        description: req.fields.description,
        price: req.fields.price,
        location: locationTab,
        user: req.user._id,
      });
      await newRoom.save();

      const user = await User.findById(req.user._id);
      let tab = user.rooms;
      tab.push(newRoom._id);
      await User.findByIdAndUpdate(req.user._id, { rooms: tab });
      res.json(newRoom);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Missing parameters" });
  }
});

router.get("/rooms", (req, res) => {
  console.log("All room");
  res.json("All rooms");
});

router.get("/rooms/:id", (req, res) => {
  console.log("One room");
  res.json("One room");
});

router.put("/room/update/:id", (req, res) => {
  console.log("Update room");
  res.json("Update");
});

router.delete("/room/delete/:id", (req, res) => {
  console.log("Delete room");
  res.json("Delete room");
});
module.exports = router;
