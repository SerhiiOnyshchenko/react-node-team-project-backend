const express = require("express");
const {
  registrationController,
  verificationController,
  verificationRepeatController,
  loginController,
  logoutController,
} = require("../../controllers/usersController");
const {
  registerUserValidation,
  loginUserValidation,
  emailBodyValidation,
} = require("../../middlewares/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpes");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = new express.Router();

// router.route("/").get();

router
  .route("/registration")
  .post(registerUserValidation, asyncWrapper(registrationController));
router
  .route("/verify/:verificationToken")
  .get(asyncWrapper(verificationController));
router
  .route("/verify")
  .post(emailBodyValidation, asyncWrapper(verificationRepeatController));
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
