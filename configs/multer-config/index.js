const multer = require("multer");
const storage  = require("./storage.config");
const parser = multer({ storage });

module.exports = parser;


/**
 * Multer is not just a body file parser.
 * Multer also interfaces with the cloud API (cloudinary on this project).
 * To be specific (I think), Multer interfaces with a storage; it could also be local file system!!
 */