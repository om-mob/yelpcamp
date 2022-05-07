const Review = require("../models/review");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
// No longer needs ExpressError -- Moved to middleware
// No longer Need joiSchemas -- Moved to middleware


const review_new_post = catchAsync(async (req, res) => {
  const { rating, body } = req.body.review;
  const campId = req.params.id;
  const campground = await Campground.findById(campId);
  const review = await new Review({ rating, body, author: req.user._id });
  campground.reviews.push(review);
  await review.save();
  await campground.save();

  req.flash('success', 'Created New Review')
  res.redirect(`/campgrounds/${campId}`);
});

const review_delete = catchAsync(async (req, res) => {
  const { reviewId, id } = req.params;
  const deleted_review = await Review.findByIdAndDelete(reviewId);
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  req.flash('success', 'Review Deleted Successfully')

  res.redirect(`/campgrounds/${id}`);
});


module.exports = {
  review_new_post,
  review_delete,
};