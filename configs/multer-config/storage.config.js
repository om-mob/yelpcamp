const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('./cloudinary.config')


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "YelpCamp",
    allowedFormats: ["jpeg", "jpg", "png"],
  },
});

module.exports = storage

/**
 * This is Just a Storage config folder.
 * We are storing images on cloudinary.
 */