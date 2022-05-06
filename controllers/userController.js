const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

const register_get = (req, res) => {
  res.render("users/register");
};

const register_post = catchAsync(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const newUser = await User.register(user, password);

    // login immediatlly after register
    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelp Camp");
      res.redirect("/campgrounds");
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/register");
  }
});

const login_get = (req, res) => {
  res.render("users/login");
};

const login_post = catchAsync(async (req, res) => {
  req.flash("success", "Welcome Back!");
  let redirectUrl = req.session.returnTo || "/campgrounds";
  
  if (redirectUrl.includes("/reviews"))  // strip away /reviews
     redirectUrl = redirectUrl.split("/").slice(0, 3).join('/');

  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

const logout = (req, res) => {
  req.logout();
  req.flash("success", "sad to see you go");
  res.redirect("/login");
};

// middleware
const authenticateLocal = () => {
  const options = { failureFlash: true, failureRedirect: "/login" };
  return passport.authenticate("local", options);
};

const authenticate = passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
});

module.exports = {
  register_get,
  register_post,
  login_get,
  login_post,
  logout,

  // middleware
  authenticate,
  authenticateLocal,
};
