const ExpressError = require("../utils/expressError");
const express = require("express");
const {
  campgrounds_index,
  campgrounds_show,
  campgrounds_new_get,
  campgrounds_new_post,
  campgrounds_edit_get,
  campgrounds_edit_put,
  campgrounds_delete,
  ValidateCampground,
  validateReview,
  review_new_post,
  review_delete,
} = require("../controllers/campgroundController");

const router = express.Router();

// View all
router.get("/", campgrounds_index);

// create
router.get("/new", campgrounds_new_get);
router.post("/", ValidateCampground, campgrounds_new_post);

// Read
router.get("/:id", campgrounds_show);

// Update
router.get("/:id/edit", campgrounds_edit_get);
router.put("/:id", ValidateCampground, campgrounds_edit_put);

// Delete
router.delete("/:id", campgrounds_delete);

/******************** Reviews *********************/
router.post("/:id/reviews", validateReview, review_new_post);
router.delete("/:id/reviews/:reviewId", review_delete)

// Handle Error
router.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

router.use((err, req, res, next) => {
  const { msg = "Something is wrong", statusCode = 500 } = err;
  if (!err.msg) err.msg = "Something went wrong";
  res.status(statusCode).render("errors", { err });
});

// router
//   .route("/:id")
//   .get(someMiddleWares)
//   .post(someMiddleWares)
//   .delete(someMiddleWares);

module.exports = router;
