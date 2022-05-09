const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { cloudinary } = require("../configs/multer-config/cloudinary.config");

const ImagesSchema = new Schema({
  filename: String,
  url: String,
});

ImagesSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [ImagesSchema],
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

CampgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) await Review.deleteMany({ _id: { $in: doc.reviews } });

  if (doc.images) {
    for (image of doc.images) {
      await cloudinary.uploader.destroy(image.filename);
    }
  }
});

const Campground = mongoose.model("Campground", CampgroundSchema);

module.exports = Campground;
