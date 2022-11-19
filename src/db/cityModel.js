const { Schema, model } = require('mongoose');
const Joi = require('joi');

const citySchema = new Schema(
	{
		city: {
			type: String,
			required: true,
		},
		region: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

const searchCitySchema = Joi.object({
	q: Joi.string().required().min(3),
});

const City = model('cities', citySchema);

module.exports = {
	City,
	searchCitySchema,
};
