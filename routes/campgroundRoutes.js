const express = require("express");
const campgroundController = require("../controllers/campgroundController");

const router = express.Router();

router.get("/", campgroundController.campgrounds_index);


router.get("/new", campgroundController.campgrounds_new_get);
router.post("/", campgroundController.campgrounds_new_post);

router.get("/:id/edit", campgroundController.campgrounds_edit_get);
router.put("/:id", campgroundController.campgrounds_edit_put);

router.get("/:id", campgroundController.campgrounds_show);

router.delete("/:id", campgroundController.campgrounds_delete);

module.exports = router;
