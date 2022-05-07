const express = require('express');
const router = express.Router({ mergeParams: true });

// controller
const reviewController = require("../controllers/reviewController");
// middlewares
const { isLoggedIn, isReviewAuthor, validateReview } = require("../controllers/middlewares");


router.post("/", isLoggedIn, validateReview, reviewController.review_new_post);
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.review_delete)


module.exports = router;