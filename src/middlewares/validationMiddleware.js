const Joi = require('joi');
const { WrongBodyError, ValidationError } = require('../helpers/errors');

const validateObjectId = (req, res, next) => {
	const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
	const validId = schema.validate(req.params.id);
	if (validId.error) {
		return next(new WrongBodyError('Not found'));
	}
};

module.exports = {
	getByIdValidate: (req, res, next) => {
		validateObjectId(req, res, next);
		next();
	},

	addNoticesValidation: (req, res, next) => {
		const schema = Joi.object({
			titleOfAd: Joi.string().required(),
			namePet: Joi.string(),
			dateOfBirth: Joi.number(),
			breed: Joi.string(),
			sex: Joi.string(),
			location: Joi.string().required(),
			price: Joi.string().required(),
			comments: Joi.string(),
			category: Joi.string(),
		});
		const validResult = schema.validate(req.body);

		if (validResult.error) {
			const [result] = validResult.error.details;
			const [missingParam] = result.path;
			return next(new ValidationError(`missing required ${missingParam} field`));
		}
		next();
	},

	removeNoticesValidation: (req, res, next) => {
		validateObjectId(req, res, next);
		next();
	},
};
