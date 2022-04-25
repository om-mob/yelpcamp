const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const campgroundRoutes = require("./routes/campgroundRoutes");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')

const app = express();
const port = process.env.PORT || 8080;

app.engine('ejs', ejsMate)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//connect to Database
mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then((result) => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log("listening on port: " + port);
    });
  })
  .catch((err) => {
    console.log("Error Connecting to database");
    console.log(err);
  });

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/campgrounds", campgroundRoutes);
