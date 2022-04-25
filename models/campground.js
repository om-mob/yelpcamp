const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {},
  location: {
    type: String,
  },
});

const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = Campground;
