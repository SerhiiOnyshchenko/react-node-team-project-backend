const { searchBreeds } = require('../services/breedService');

const searchBreedsController = async (req, res) => {
	const { q } = req.query;
	const list = await searchBreeds(q);
	res.json(list);
};

module.exports = { searchBreedsController };
