const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {},
  location: {
    type: String,
    required: true,
  },
});

const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = Campground;
