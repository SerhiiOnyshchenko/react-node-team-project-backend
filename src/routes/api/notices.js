const express = require('express');
const {
	getByIdValidate,
	addNoticesValidation,
	removeNoticesValidation,
} = require('../../middlewares/validationMiddleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const {
	addNoticesController,
	listNoticesController,
	getNoticesByIdController,
	removeNoticesController,
	userListNoticesController,
} = require('../../controllers/noticesController');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');
const { listNoticesValidation } = require('../../middlewares/noticeMiddleware');

const router = new express.Router();

router
	.route('/user')
	.get(authMiddleware, asyncWrapper(userListNoticesController));
router
	.route('/')
	.get(listNoticesValidation, asyncWrapper(listNoticesController))
	.post(
		authMiddleware,
		uploadMiddleware.single('image'),
		addNoticesValidation,
		asyncWrapper(addNoticesController)
	);
router
	.route('/:id')
	.get(getByIdValidate, asyncWrapper(getNoticesByIdController))
	.delete(
		authMiddleware,
		removeNoticesValidation,
		asyncWrapper(removeNoticesController)
	);

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes: /notices ',
		data: 'Not found',
	});
});

module.exports = router;
