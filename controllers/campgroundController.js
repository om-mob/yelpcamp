const Campground = require("../models/campground");

const campgrounds_index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

const campgrounds_show = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.render("campgrounds/show", { camp });
};

const campgrounds_new_get = async (req, res) => {
  res.render("campgrounds/new");
};

const campgrounds_new_post = async (req, res) => {
  const newCamp = await new Campground({ ...req.body.campground });
  await newCamp.save();
  res.redirect(`/campgrounds/${newCamp._id}`);
};

const campgrounds_edit_get = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
};

const campgrounds_edit_put = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true });
  res.redirect(`/campgrounds/${campground._id}`);
};

const campgrounds_delete = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')
}

module.exports = {
  campgrounds_index,
  campgrounds_show,
  campgrounds_new_get,
  campgrounds_new_post,
  campgrounds_edit_get,
  campgrounds_edit_put,
  campgrounds_delete,
};
//
