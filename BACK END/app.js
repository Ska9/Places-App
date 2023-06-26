const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const placesRoutes = require("./routes/places-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);

app.use("/api/places", placesRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An known error!" });
});

mongoose
  .connect(
    "mongodb+srv://Ska:vTjy0zuSndZjJ4wO@cluster0.lj4dacc.mongodb.net/WeTravelDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Database successfully connected!");
  })
  .catch(() => {
    console.log("Failed connection to Database!");
  });
