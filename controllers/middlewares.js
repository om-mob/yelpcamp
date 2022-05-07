const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = (resourceModel) => {
  return async (req, res, next) => {
    const resource = await resourceModel
      .findById(
        resourceModel === Campground
          ? req.params.id
          : req.params.reviewId
      )
      .populate("author", ["username"]);
    if (!resource.author?.equals(req.user?._id)) {
      req.flash("error", `You are not ${resource.author?.username}`);
      return res.redirect(`/campgrounds/${req.params.id}`);
    }

    next();
  };
};
