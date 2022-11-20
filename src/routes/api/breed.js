const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { searchBreedValidation } = require('../../middlewares/breedMiddleware');
const { searchBreedsController } = require('../../controllers/breedController');

const router = new express.Router();

router
	.route('/search')
	.get(searchBreedValidation, asyncWrapper(searchBreedsController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /breeds',
		data: 'Not found',
	});
});

module.exports = router;
