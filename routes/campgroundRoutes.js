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
} = require("../controllers/campgroundController");

// middlewares
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// View all
router.get("/", campgrounds_index);

// create
router.get("/new", isLoggedIn, campgrounds_new_get);
router.post("/", isLoggedIn, ValidateCampground, campgrounds_new_post);

// Read
router.get("/:id", campgrounds_show);

// Update
router.get("/:id/edit", isLoggedIn, campgrounds_edit_get);
router.put("/:id", isLoggedIn, ValidateCampground, campgrounds_edit_put);

// Delete
router.delete("/:id", isLoggedIn, campgrounds_delete);

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
