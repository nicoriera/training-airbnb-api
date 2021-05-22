const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
app.use(formidable());
app.use(helmet());
app.use(cors());

mongoose.connect("mongodb://localhost/airbnb-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

app.get("/", function (req, res) {
  res.send("Wlecom to Airbnb API.");
});

app.all("*", function (req, res) {
  res.status(404).json({ message: "Page not found" });
});
app.listen(3000, () => {
  console.log("Server has started");
});
