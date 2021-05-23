const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
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

const roomRoutes = require("./routes/room");
app.use(roomRoutes);

app.get("/", function (req, res) {
  res.send("Welcome to Airbnb API.");
});

app.all("*", function (req, res) {
  res.status(404).json({ message: "Page not found" });
});
app.listen(3000, () => {
  console.log("Server has started");
});
