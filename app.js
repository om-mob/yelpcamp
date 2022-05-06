const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const campgroundRoutes = require("./routes/campgroundRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/expressError");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");

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
const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionConfig));

// flash
app.use(flash());

// passport -- 5 lines
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // use passport session
passport.use(new localStrategy(User.authenticate())); // authenticate using any strategy

passport.serializeUser(User.serializeUser()); // serialize and deserialize model (is it always user OR it is because the model is called User)
passport.deserializeUser(User.deserializeUser());

// testing something -- DELETE LATER
app.get("/makeuser", async (req, res) => {
  const user = new User({ email: "colt2@gmail.com", username: "colt2" });
  console.log(user);
  const newUser = await User.register(user, "password");

  // await user.save() // No longer Needed
  res.send(newUser);
});


// local vars
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user
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
