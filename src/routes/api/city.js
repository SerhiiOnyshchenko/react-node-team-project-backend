const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { searchCityValidation } = require('../../middlewares/cityMiddleware');
const { searchCitiesController } = require('../../controllers/cityController');

const router = new express.Router();

router
	.route('/search')
	.get(searchCityValidation, asyncWrapper(searchCitiesController));

router.use((_, res, __) => {
	res.status(404).json({
		status: 'error',
		code: 404,
		message: 'Use api on routes:   /cities',
		data: 'Not found',
	});
});

module.exports = router;
