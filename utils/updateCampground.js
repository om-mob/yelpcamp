const { cloudinary } = require("../configs/multer-config/cloudinary.config");

function updateCampground({ campgroundBody, imageFiles, oldImages }) {
  // parse Images
  const newimages = imageFiles.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  const newCampgroundData = {
    title: campgroundBody.title,
    price: campgroundBody.price,
    location: campgroundBody.location,
    description: campgroundBody.description,
    images: [...oldImages, ...newimages],
  };

  return newCampgroundData;
}

const deleteImages = async (campground, imagestoDelete) =>  {
  for (filename of imagestoDelete) {
    await cloudinary.uploader.destroy(filename);
  };
  await campground.updateOne({
    $pull: { images: { filename: { $in: imagestoDelete } } },
  });
}

module.exports = {
  updateCampground,
  deleteImages,
};
