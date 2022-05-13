const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

// connect to database
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// populate database
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "ID",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
        type: "Point",
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          filename: "YelpCamp/b8xl6jeortmfrigwi5cs",
          url: "https://res.cloudinary.com/dmdxlwndv/image/upload/v1652124773/YelpCamp/b8xl6jeortmfrigwi5cs.jpg",
        },
        {
          filename: "YelpCamp/aflojszdiaa8aa0x94tk",
          url: "https://res.cloudinary.com/dmdxlwndv/image/upload/v1652124956/YelpCamp/aflojszdiaa8aa0x94tk.jpg",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam error quo assumenda id nihil ipsam expedita natus similique provident ut repellat, aspernatur sint laboriosam laudantium vitae soluta, accusamus odio impedit quae cum. Nisi accusantium delectus labore tenetur odio reprehenderit doloremque natus sunt qui officia optio, omnis magnam sequi. Ut, consequuntur?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
