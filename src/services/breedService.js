const { Breed } = require('../db/breedModel');

const searchBreeds = async name => {
	const breeds = await Breed.find({
		breed: { $regex: name + '.*', $options: 'i' },
	}).limit(20);
	return breeds;
};

module.exports = { searchBreeds };
