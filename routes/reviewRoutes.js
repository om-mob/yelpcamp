const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");


router.post("/", reviewController.validateReview, reviewController.review_new_post);
router.delete("/:reviewId", reviewController.review_delete)


module.exports = router;