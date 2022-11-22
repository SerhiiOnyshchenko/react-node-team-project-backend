const { ValidationError } = require('../helpers/errors');
const { listNoticesSchema } = require('../db/noticesModel');

const listNoticesValidation= (req, res, next) => {
	const validationResult = listNoticesSchema.validate(req.query);
	if (validationResult.error) {
		next(new ValidationError(validationResult.error.details[0].message));
	}
	next();
};

module.exports = {
	listNoticesValidation,
};
