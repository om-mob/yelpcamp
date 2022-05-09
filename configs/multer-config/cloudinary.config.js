const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloud Storage Credential (API Credential) 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// storage set up
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "YelpCamp",
    allowedFormats: ["jpeg", "jpg", "png"],
  },
});


module.exports =  {
  storage,
  cloudinary
};

/**
 * This is Just a Storage config folder.
 * We are storing images on cloudinary.
 */