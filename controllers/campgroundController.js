const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/expressError");
const { campgroundSchema } = require("../schemas");

/*********************************************************************/
/******************** campground controllers *************************/
const campgrounds_index = catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

const campgrounds_show = catchAsync(async (req, res) => {
  const { id } = req.params;

  const camp = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author", select: "username" },
      select: "body rating author createdAt",
    })
    .populate({ path: "author", select: "username" });

  if (!camp) {
    req.flash("error", "Campground Doesn't exist");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { camp });
});

const campgrounds_new_get = (req, res) => {
  res.render("campgrounds/new");
};

const campgrounds_new_post = catchAsync(async (req, res, next) => {
  // no need to get the author --(from users collections)-- It's already in req.user (local vars)
  const newCamp = await new Campground({ ...req.body.campground }); // create camp ground
  newCamp.author = req.user._id; // Set author
  await newCamp.save();
  req.flash("success", "New Campground Created Successfully");
  res.redirect(`/campgrounds/${newCamp._id}`);
});

const campgrounds_edit_get = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate("author", [
    "username",
  ]);

  if (!campground) {
    // Check if campground Exists
    req.flash("error", "Campground Doesn't exist");
    return res.redirect(`/campgrounds`);
  }

  res.render("campgrounds/edit", { campground });
});

const campgrounds_edit_put = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(
    id,
    { ...req.body.campground },
    { runValidators: true }
  );
  req.flash("success", "Campground Updated Successfully");
  res.redirect(`/campgrounds/${campground._id}`);
});

const campgrounds_delete = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);

  req.flash("success", "Campground Deleted Successfully");

  res.redirect("/campgrounds");
});

/*********************************************************/
/******************** Middleware *************************/

const ValidateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((detail) => detail.message).join("\n");
    throw new ExpressError(400, msg);
  }
  next();
};

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
};
//
