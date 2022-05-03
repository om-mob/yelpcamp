const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const userController = require("../controllers/userController");

router
  .route("/register")
  .get(userController.register_get)
  .post(userController.register_post);

router
  .route("/login")
  .get(userController.login_get)
  .post(userController.authenticate, userController.login_post);

router.route("/logout").get(userController.logout);

module.exports = router;
