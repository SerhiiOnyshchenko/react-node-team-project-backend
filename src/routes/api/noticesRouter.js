const express = require('express');
const router = express.Router();

const {
	getByIdValidate,
	addNoticesValidation,
	removeNoticesValidation,
} = require('../../middlewares/validationMiddleware');

const {
	addNoticesController,
	listNoticesController,
	getNoticesByIdController,
	removeNoticesController,
} = require('../../controllers/noticesController');
const { asyncWrapper } = require('../../helpers/apiHelpes');

router.get('/', asyncWrapper(listNoticesController));
router.get('/:id', getByIdValidate, asyncWrapper(getNoticesByIdController));
router.post('/', addNoticesValidation, asyncWrapper(addNoticesController));
router.delete('/:id', removeNoticesValidation, asyncWrapper(removeNoticesController));
// router.put('/:id');
// router.patch('/:id/favorite');

module.exports = { noticesRouter: router };
