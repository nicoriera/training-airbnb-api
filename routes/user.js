const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const User = require("../models/User");
const Room = require("../models/Room");

// Inscription
router.post("/user/sign_up", async (req, res) => {
  try {
    // Pour vérifier si email présent dans BDD
    const userEmail = await User.findOne({ email: req.fields.email });
    // Pour vérifeir si username présent dans BDD
    const userUserName = await User.findOne({
      "account.username": req.fields.username,
    });

    if (userEmail) {
      res.status(400).json({ error: "This email has an account" });
    } else if (userUserName) {
      res.status(400).json({ error: "This username has an account" });
    } else {
      if (
        req.fields.password &&
        req.fields.email &&
        req.fields.username &&
        req.fields.name &&
        req.fields.description
      ) {
        // Cryptage mot de passe
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);

        // Création compte utilisateur
        const newUser = new User({
          email: req.fields.email,
          token: token,
          salt: salt,
          hash: hash,
          account: {
            username: req.fields.username,
            description: req.fields.description,
            name: req.fields.name,
          },
        });

        await newUser.save();

        res.json({
          _id: newUser._id,
          token: newUser.token,
          email: newUser.email,
          username: newUser.account.username,
          description: newUser.account.description,
          name: newUser.account.name,
        });
      } else {
        res.status(400).json({ error: "Missing parameters" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Connexion à son compte utilisateur
router.post("/user/log_in", async (req, res) => {
  try {
    // si le password et l'email ont bien été renseignés
    if (req.fields.password && req.fields.email) {
      // on cherche l'utilisateur correspondent à l'email dans la BDD
      const user = await User.findOne({
        email: req.fields.email,
      });

      if (user) {
        if (
          // on vérifie la correspondance entre le mot de passe et le hash et salt en BDD
          SHA256(req.fields.password + user.salt).toString(encBase64) ===
          user.hash
        ) {
          res.json({
            _id: user._id,
            token: user.token,
            email: user.email,
            username: user.account.username,
            description: user.account.description,
            name: user.account.name,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ error: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
