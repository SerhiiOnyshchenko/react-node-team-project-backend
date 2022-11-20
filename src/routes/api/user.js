const express = require('express');
const {
	registrationController,
	verificationController,
	verificationRepeatController,
	loginController,
	logoutController,
	getUserInfoController,
	updateUserInfoController,
	addToFavoriteController,
	listFavoriteController,
	deleteFavoriteController,
	refreshTokenController,
	findUserByIdController,
} = require('../../controllers/usersController');
const {
	registerUserValidation,
	loginUserValidation,
	emailBodyValidation,
	updateUserInfoValidation,
} = require('../../middlewares/validationMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');

const router = new express.Router();

router
	.route('/registration')
	.post(registerUserValidation, asyncWrapper(registrationController));
router
	.route('/verify/:verificationToken')
	.get(asyncWrapper(verificationController));
router
	.route('/verify')
	.post(emailBodyValidation, asyncWrapper(verificationRepeatController));
router.route('/login').post(loginUserValidation, asyncWrapper(loginController));
router.route('/logout').post(authMiddleware, asyncWrapper(logoutController));
router
	.route('/current')
	.get(authMiddleware, asyncWrapper(getUserInfoController));
router
	.route('/update')
	.patch(
		authMiddleware,
		uploadMiddleware.single('image'),
		updateUserInfoValidation,
		asyncWrapper(updateUserInfoController)
	);

router
	.route('/favorite')
	.get(authMiddleware, asyncWrapper(listFavoriteController));

router.route('/:id').get(authMiddleware, asyncWrapper(findUserByIdController));

router
	.route('/favorite/:id')
	.post(authMiddleware, asyncWrapper(addToFavoriteController))
	.delete(authMiddleware, asyncWrapper(deleteFavoriteController));

router
	.route('/refreshtoken')
	.post(authMiddleware, asyncWrapper(refreshTokenController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /user',
		data: 'Not found',
	});
});

module.exports = router;
