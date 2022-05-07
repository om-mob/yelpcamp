const express = require("express");
const router = express.Router();
// controller
const userController = require("../controllers/userController");
// middlewares
const { authenticateLocal } = require("../controllers/middlewares");

router
  .route("/register")
  .get(userController.register_get)
  .post(userController.register_post);

router
  .route("/login")
  .get(userController.login_get)
  .post(authenticateLocal, userController.login_post);

router.route("/logout").get(userController.logout);

module.exports = router;
