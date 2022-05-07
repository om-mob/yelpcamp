const express = require("express");
const router = express.Router();

// controller
const {
  campgrounds_index,
  campgrounds_show,
  campgrounds_new_get,
  campgrounds_new_post,
  campgrounds_edit_get,
  campgrounds_edit_put,
  campgrounds_delete,
} = require("../controllers/campgroundController");
// middlewares
const { isLoggedIn, isCampgroundAutor, ValidateCampground, handle_error, page_not_found } = require("../controllers/middlewares");


// View all
router.get("/", campgrounds_index);

// create
router.get("/new", isLoggedIn, campgrounds_new_get);
router.post("/", isLoggedIn, ValidateCampground, campgrounds_new_post);

// Read
router.get("/:id", campgrounds_show);

// Update
router.get("/:id/edit", isLoggedIn, isCampgroundAutor, campgrounds_edit_get);
router.put("/:id", isLoggedIn, isCampgroundAutor, ValidateCampground, campgrounds_edit_put);

// Delete
router.delete("/:id", isLoggedIn, isCampgroundAutor, campgrounds_delete);

// Handle Error
router.all("*", page_not_found);
router.use(handle_error);

// router
//   .route("/:id")
//   .get(someMiddleWares)
//   .post(someMiddleWares)
//   .delete(someMiddleWares);

module.exports = router;
