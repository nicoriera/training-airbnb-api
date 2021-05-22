const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Room = require("../models/Room");

router.post("/room/publish", (req, res) => {
  console.log("New room");
  res.json("New room");
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
