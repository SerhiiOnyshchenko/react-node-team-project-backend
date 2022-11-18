const express = require('express');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { searchBreedValidation } = require('../../middlewares/breedMiddleware');
const { searchBreedsController } = require('../../controllers/breedController');

const router = new express.Router();

// .../api/breeds/search?q=ala

router
	.route('/search')
	.get(searchBreedValidation, asyncWrapper(searchBreedsController));

module.exports = router;
