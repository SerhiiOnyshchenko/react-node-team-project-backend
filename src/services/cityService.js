const { City } = require('../db/cityModel');

const searchCities = async name => {
	const cities = await City.find({
		city: { $regex: name + '.*', $options: 'i' },
	}).limit(20);
	return cities;
};

module.exports = { searchCities };
