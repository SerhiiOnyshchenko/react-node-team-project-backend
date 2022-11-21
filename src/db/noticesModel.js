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
			required: true,
		},

		comments: {
			type: String,
		},

		category: {
			type: String,
			enum: ['lost/found', 'in_good_hands', 'sell'],
		},

		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},

		image: {
			type: String,
		},
	},
	{ versionKey: false }
);

const Notices = mongoose.model('notices', noticesSchema);

const searchByTitleSchema = Joi.object({
	// category: Joi.string().valid('lost/found', 'in_good_hands', 'sell', "favorite_ads", "my_ads"),
	searchQuery: Joi.string(),
});

module.exports = {
	Notices,
	searchByTitleSchema
};
