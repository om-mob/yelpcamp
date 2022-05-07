const Campground = require("../models/campground");
const Review = require("../models/review");
const { campgroundSchema, reviewSchema } = require("../models/joiSchemas");
const ExpressError = require("../utils/expressError");
const passport = require("passport");

// Validate
validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const msg = error.details.map((detail) => detail.message).join("\n");
      throw new ExpressError(400, msg);
    }
    next();
  };
};
module.exports.ValidateCampground = validate(campgroundSchema);
module.exports.validateReview = validate(reviewSchema);

// Authentication
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};

// Login
authenticate = (strategy) => {
  const options = { failureFlash: true, failureRedirect: "/login" };
  return passport.authenticate(strategy, options); // provided by passport.set(strategy)
};
module.exports.authenticateLocal = authenticate("local");

// Authorize
isAuthor = (resourceModel) => {
  return async (req, res, next) => {
    const resource = await resourceModel
      .findById(
        resourceModel === Campground ? req.params.id : req.params.reviewId
      )
      .populate("author", ["username"]);
    if (!resource.author?.equals(req.user?._id)) {
      req.flash("error", `You are not ${resource.author?.username}`);
      return res.redirect(`/campgrounds/${req.params.id}`);
    }

    next();
  };
};
module.exports.isCampgroundAutor = isAuthor(Campground);
module.exports.isReviewAuthor = isAuthor(Review);

// Error Handling
module.exports.handle_error = (err, req, res, next) => {
  const { msg = "Something is wrong", statusCode = 500 } = err;
  if (!err.msg) err.msg = "Something went wrong";
  res.status(statusCode).render("errors", { err });
};

module.exports.page_not_found = (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
};
