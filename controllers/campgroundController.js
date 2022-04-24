const Campground = require("../models/campground");

const campground_index = async (req, res) => {
  const camp = new Campground({
    title: "My backyard",
  });
  const result = await camp.save()
  res.send('camp')
};

module.exports = {
  campground_index,
};
