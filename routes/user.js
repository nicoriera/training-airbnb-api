const express = require("express");
const router = express.Router();

// Inscription
router.post("/user/sign_up", (req, res) => {
  console.log("Hello");
  res.json({ message: "signup" });
});

// Connexion
router.post("/user/log_in", (req, res) => {
  console.log("Salut");
  res.json("Salut");
});
module.exports = router;
