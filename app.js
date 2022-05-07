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
// utils
const ExpressError = require("./utils/expressError");
//configs
const initializePassport = require("./configs/passport.config");
const sessionConfig = require("./configs/session.config");
// Routes
const campgroundRoutes = require("./routes/campgroundRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");


// General Settings
const app = express();
const port = process.env.PORT || 8080;


// Settings
app.engine("ejs", ejsMate);
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
app.use(express.static(path.join(__dirname, "public")));

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
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { msg = "Something is wrong", statusCode = 500 } = err;
  res.status(statusCode).render("errors", { err });
});
