const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
// For Image Upload
const cloudinary = require("../configs/multer-config/cloudinary.config");
// For location and maps
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

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
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
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

CampgroundSchema.methods.constructCampground = async function(campgroundBody, ImageFiles) {
  // Parse Images
  const images = ImageFiles ? ImageFiles.map((f) => ({ url: f.path, filename: f.filename })) : [];
  
  // Parse Location
  const response = await geocoder.forwardGeocode({
    query: campgroundBody.location,
    limit: 1
  }).send()
  campgroundBody.location = {
    name: campgroundBody.location,
    coordinates: response.body.features[0].geometry.coordinates,
    type: 'Point'
  }
  // Construct
  this.title = campgroundBody.title;
  this.price = campgroundBody.price;
  this.location = campgroundBody.location;
  this.description = campgroundBody.description;
  this.author = campgroundBody.author;
  this.images = images;

  return this
}


CampgroundSchema.methods.updateCampground = async function ({
  campgroundBody,
  newImageFiles,
  imagesToDelete,
}) {
  // Parse Images
  const newimages = newImageFiles.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  // Parse Location
  const response = await geocoder.forwardGeocode({
    query: campgroundBody.location,
    limit: 1
  }).send()
  campgroundBody.location = {
    name: campgroundBody.location,
    coordinates: response.body.features[0].geometry.coordinates,
    type: 'Point'
  }

  // Update Camp
  try {
    await this.updateOne(
      {
        title: campgroundBody.title,
        price: campgroundBody.price,
        location: campgroundBody.location,
        description: campgroundBody.description,
        images: [...this.images, ...newimages],
      },
      { runValidators: true }
    );
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
      await this.updateOne(
        {
          $pull: { images: { filename: { $in: imagesToDelete } } },
        },
        { runValidators: true }
      );
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
