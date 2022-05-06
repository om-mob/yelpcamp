const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
// middlewares
const { isLoggedIn, isAuthor } = require("../controllers/middlewares");
const Review = require('../models/review')

router.post("/", isLoggedIn, reviewController.validateReview, reviewController.review_new_post);
router.delete("/:reviewId", isLoggedIn, isAuthor(Review), reviewController.review_delete)


module.exports = router;