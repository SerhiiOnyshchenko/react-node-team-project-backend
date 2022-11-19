const { ValidationError } = require('../helpers/errors');
const { searchBreedSchema } = require('../db/breedModel');

const searchBreedValidation = (req, res, next) => {
	const validationResult = searchBreedSchema.validate(req.query);
	if (validationResult.error) {
		next(new ValidationError(validationResult.error.details[0].message));
	}
	next();
};

module.exports = {
	searchBreedValidation,
};
