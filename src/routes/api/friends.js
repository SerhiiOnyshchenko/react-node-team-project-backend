const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { getFriendsController } = require('../../controllers/friendsController');

const router = new express.Router();

router.route('/').get(asyncWrapper(getFriendsController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /friends',
		data: 'Not found',
	});
});

module.exports = router;
