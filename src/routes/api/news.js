const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const getNewsController = require('../../controllers/newsController');

const router = new express.Router();

router.route('/').get(asyncWrapper(getNewsController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /news',
		data: 'Not found',
	});
});

module.exports = router;
