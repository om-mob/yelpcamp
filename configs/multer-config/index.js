const multer = require("multer");
const { storage } = require("./cloudinary.config");
const parser = multer({ storage });

module.exports = parser;
