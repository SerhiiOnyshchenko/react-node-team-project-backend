const express = require("express");
const {
  registrationController,
  loginController,
  logoutController,
} = require("../../controllers/usersController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../../middlewares/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpes");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = new express.Router();

// router.route("/").get();

router
  .route("/registration")
  .post(registerUserValidation, asyncWrapper(registrationController));
router.route("/login").post(loginUserValidation, asyncWrapper(loginController));
router.route("/logout").post(authMiddleware, asyncWrapper(logoutController));

router.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: POST /user",
    data: "Not found",
  });
});

module.exports = router;
