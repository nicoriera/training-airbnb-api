const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const User = require("../models/User");
const Room = require("../models/Room");

// Inscription
router.post("/user/sign_up", (req, res) => {
  const password = req.fileds.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(16);
  console.log("Hello");
  res.json({ message: "signup" });
});

// Connexion
router.post("/user/log_in", (req, res) => {
  console.log("Salut");
  res.json("Salut");
});

module.exports = router;
