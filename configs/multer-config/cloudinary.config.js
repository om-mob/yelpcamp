const cloudinary = require("cloudinary").v2;

// Cloud Storage Credential (API Credential)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


module.exports = cloudinary; // <-- Needed to Delete assets from cloud. So far no other purpose.


