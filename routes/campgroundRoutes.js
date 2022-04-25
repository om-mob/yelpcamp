const express = require("express");
const campgroundController = require("../controllers/campgroundController");

const router = express.Router();

// View all
router.get("/", campgroundController.campgrounds_index);

// create
router.get("/new", campgroundController.campgrounds_new_get);
router.post("/", campgroundController.campgrounds_new_post);

// Read
router.get("/:id", campgroundController.campgrounds_show);

// Update
router.get("/:id/edit", campgroundController.campgrounds_edit_get);
router.put("/:id", campgroundController.campgrounds_edit_put);

// Delete
router.delete("/:id", campgroundController.campgrounds_delete);

// router
//   .route("/:id")
//   .get(someMiddleWares)
//   .post(someMiddleWares)
//   .delete(someMiddleWares);

module.exports = router;
