const { Schema, model } = require('mongoose');
const Joi = require('joi');

const breedSchema = new Schema(
	{
		breed: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

const searchBreedSchema = Joi.object({
	q: Joi.string().required().min(3),
});

const Breed = model('breeds', breedSchema);

module.exports = {
	Breed,
	searchBreedSchema,
};
