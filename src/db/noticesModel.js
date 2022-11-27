const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Joi = require('joi');

const noticesSchema = new mongoose.Schema(
	{
		titleOfAd: {
			type: String,
			required: true,
		},
		namePet: {
			type: String,
		},

		dateOfBirth: {
			type: String,
			default: '00.00.0000',
		},

		breed: {
			type: String,
		},

		sex: {
			type: String,
			enum: ['female', 'male'],
		},

		location: {
			type: String,
			required: true,
		},

		price: {
			type: String,
			required: false,
		},

		comments: {
			type: String,
		},

		category: {
			type: String,
			enum: ['lost/found', 'in good hands', 'sell'],
		},

		owner: {
			_id: { type: Schema.Types.ObjectId },
			email: { type: String },
			phone: { type: String },
			name: { type: String },
		},

		image: {
			type: String,
		},
	},
	{ versionKey: false }
);

const Notices = mongoose.model('notices', noticesSchema);

const listNoticesSchema = Joi.object({
	category: Joi.string().valid('lost/found', 'in_good_hands', 'sell'),
	q: Joi.string(),
	page: Joi.number().min(1),
	limit: Joi.number().min(0)
});

module.exports = {
	Notices,
	listNoticesSchema
};
