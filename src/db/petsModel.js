const { Schema, model } = require('mongoose');
const Joi = require('joi');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const petsSchema = new Schema(
	{
		name: {
			type: String,
			minLength: 2,
			maxLength: 16,
			required: true,
		},
		birthday: {
			type: String,
			default: '00.00.0000',
		},
		breed: {
			type: String,
			minLength: 2,
			maxLength: 30,
			required: true,
		},
		comments: {
			type: String,
			minLength: 8,
			maxLength: 120,
		},
		owner: {
			type: ObjectId,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false }
);

const createPetSchema = Joi.object({
	name: Joi.string().min(2).max(16).required(),
	birthday: Joi.string(),
	breed: Joi.string().min(2).max(16).required(),
	comments: Joi.string().min(8).max(120),
});

const schemas = {
	createPetSchema,
};

const Pet = model('pets', petsSchema);

module.exports = {
	Pet,
	schemas,
};
