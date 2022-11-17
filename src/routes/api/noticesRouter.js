const express = require('express');
const router = express.Router();

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

router.get('/user', authMiddleware, asyncWrapper(userListNoticesController));
router.get('/', asyncWrapper(listNoticesController));
router.get('/:id', getByIdValidate, asyncWrapper(getNoticesByIdController));
router.post(
	'/',
	authMiddleware,
	addNoticesValidation,
	asyncWrapper(addNoticesController)
);
router.delete(
	'/:id',
	authMiddleware,
	removeNoticesValidation,
	asyncWrapper(removeNoticesController)
);
// router.put('/:id');

module.exports = router;
