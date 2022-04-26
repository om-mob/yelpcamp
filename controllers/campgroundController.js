const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const { campgroundSchema } = require("../schemas");
const Review = require("../models/review"); // Just so you can add a review to a campground. Since it's one to many relationship
const { reviewSchema } = require("../schemas");

const campgrounds_index = catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

const campgrounds_show = catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id).populate("reviews");
  res.render("campgrounds/show", { camp });
});

const campgrounds_new_get = (req, res) => {
  res.render("campgrounds/new");
};

const campgrounds_new_post = catchAsync(async (req, res, next) => {
  const newCamp = await new Campground({ ...req.body.campground });
  await newCamp.save();
  res.redirect(`/campgrounds/${newCamp._id}`);
});

const campgrounds_edit_get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});

const campgrounds_edit_put = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(
    id,
    { ...req.body.campground },
    { runValidators: true }
  );
  res.redirect(`/campgrounds/${campground._id}`);
});

const campgrounds_delete = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

/*********************************************************/
/******************** Middleware *************************/

const ValidateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

/*********************************************************/
/*********************** reviews *************************/
const review_new_post = catchAsync(async (req, res) => {
  const { rating, body } = req.body.review;
  const campId = req.params.id;
  const campground = await Campground.findById(campId);
  const review = await new Review({ rating, body });
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campId}`);
});

const review_delete = catchAsync(async (req, res) => {
  const { reviewId, id } = req.params;
  const deleted_review = await Review.findByIdAndDelete(reviewId);
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  res.redirect(`/campgrounds/${id}`);
});

module.exports = {
  campgrounds_index,
  campgrounds_show,
  campgrounds_new_get,
  campgrounds_new_post,
  campgrounds_edit_get,
  campgrounds_edit_put,
  campgrounds_delete,

  // middlewares
  ValidateCampground,
  validateReview,
  // reviews
  review_new_post,
  review_delete,
};
//
