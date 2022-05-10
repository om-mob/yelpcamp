const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const cloudinary  = require("../configs/multer-config/cloudinary.config");

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

CampgroundSchema.methods.updateCampground = async function ({
  campgroundBody,
  newImageFiles,
  imagesToDelete,
}) {
  const newimages = newImageFiles.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  // Update Camp
  try {
    await this.updateOne({
      title: campgroundBody.title,
      price: campgroundBody.price,
      location: campgroundBody.location,
      description: campgroundBody.description,
      images: [...this.images, ...newimages],
    }, { runValidators: true });
  } catch (e) {
    console.log(e);
    return -1;
  }
  // Remove images from cloudinary
  if (imagesToDelete?.length) {
    try {
      for (filename of imagesToDelete) {
        await cloudinary.uploader.destroy(filename);
      }
    } catch (e) {
      console.log(e);
      return -2;
    }
    // Remove images from Mongo
    try {
      await this.updateOne({
        $pull: { images: { filename: { $in: imagesToDelete } } },
      }, { runValidators: true });
    } catch (e) {
      console.log(e);
      return -3;
    }
  }
};


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
