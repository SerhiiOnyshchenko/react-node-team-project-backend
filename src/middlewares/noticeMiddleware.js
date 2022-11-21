const { ValidationError } = require('../helpers/errors');
const { searchByTitleSchema } = require('../db/noticesModel');

const searchByTitleValidation= (req, res, next) => {
	const validationResult = searchByTitleSchema.validate(req.body);
	if (validationResult.error) {
		next(new ValidationError(validationResult.error.details[0].message));
	}
	next();
};

module.exports = {
	searchByTitleValidation,
};
