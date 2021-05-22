const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");
const helmet = require("helmet");

const app = express();
app.use(helmet());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server has started");
});
