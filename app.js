if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// modules
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
// dependencies -- Replacable
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
//configs
const initializePassport = require("./configs/passport.config");
const sessionConfig = require("./configs/session.config");
// Routes
const campgroundRoutes = require("./routes/campgroundRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
// Middlewares -- for Error Handling
const { page_not_found, handle_error } = require("./controllers/middlewares");
// Security
const mongoSanatize = require('express-mongo-sanitize')
const helmetContentSecurityPolicy = require('./configs/helmet.config')


// General Settings
const app = express();
const port = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";
// const dbUrl = "mongodb://localhost:27017/yelp-camp"


// Settings
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//connect to Database
mongoose
  .connect(dbUrl)
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


/*********** middlewares ***********/
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Security
app.use(mongoSanatize())
app.use(helmetContentSecurityPolicy)

// sessions
app.use(session(sessionConfig));

// flash
app.use(flash());

// passport
initializePassport(passport);
// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());


// local vars
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});


// routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", userRoutes);


// Error Handling
app.all("*", page_not_found);
app.use(handle_error);
