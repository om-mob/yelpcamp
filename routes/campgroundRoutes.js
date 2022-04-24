const express = require("express");
const campgroundController = require("../controllers/campgroundController");

const router = express.Router();

router.get("/", campgroundController.campground_index);

module.exports = router;
