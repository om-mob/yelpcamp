const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const createCampground = require("../utils/createCampground");
const { updateCampground, deleteImages } = require("../utils/updateCampground");
// No longer needs ExpressError -- Moved to middleware
// No longer Need joiSchemas -- Moved to middleware

const campgrounds_index = catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

/*
campgrounds_show
1. Model
  get the camp from database (using the id attached to request params)
2. View
  Renders the show page (passing camp to it)

Guard clauses: camp -with provided id- might not exist
*/
const campgrounds_show = catchAsync(async (req, res) => {
  const { id } = req.params;

  const camp = await Campground.findById(id)
    .populate({
      path: "reviews",
      select: "body rating author createdAt",
      populate: { path: "author", select: "username" },
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

/**
 * campgrounds_new_post
 * 1. Pulls Data from request body
 * 2. Model
 *  2.1 creates campground
 *  2.2 saves campground to Database
 * 3. View
 *  No Action
 */
const campgrounds_new_post = catchAsync(async (req, res, next) => {
  // no need to get the author --(from users collections)-- It's already in req.user (local vars)
  const newCamp = createCampground({
    CampgroundModel: Campground,
    campgroundBody: req.body.campground,
    imageFiles: req.files,
    userId: req.user._id,
  });
  // const newCamp = await new Campground({ ...req.body.campground }); // create camp ground
  // newCamp.author = req.user._id; // Set author
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

/**
 * campgrounds_edit_put:
 * 1. get the campground
 * 2. update the campground
 * 3. save the campground
 * 4. redirect
 */
const campgrounds_edit_put = catchAsync(async (req, res) => {
  const { id } = req.params;

  const oldCamp = await Campground.findById(id);
  const oldImages = oldCamp.images;

  // Todo: 'Try to' Put These On the model schema, Dumbass!!
  const newCampgroundData = updateCampground({
    campgroundBody: req.body.campground,
    imageFiles: req.files,
    oldImages,
  });
  const campground = await Campground.findByIdAndUpdate(
    id,
    { ...newCampgroundData },
    { runValidators: true }
  );
  // Delete Images
  if (req.body.deleteImages?.length) {
    await deleteImages(campground, req.body.deleteImages);
  }

  req.flash("success", "Campground Updated Successfully");
  res.redirect(`/campgrounds/${campground._id}`);
});

const campgrounds_delete = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);

  req.flash("success", "Campground Deleted Successfully");

  res.redirect("/campgrounds");
});

module.exports = {
  campgrounds_index,
  campgrounds_show,
  campgrounds_new_get,
  campgrounds_new_post,
  campgrounds_edit_get,
  campgrounds_edit_put,
  campgrounds_delete,
};
