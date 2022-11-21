const mongoose = require('mongoose');

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
			enum: ['lost/found', 'in_good_hands', 'sell'],
		},

		owner: {
			type: Object,
		},

		image: {
			type: String,
		},
	},
	{ versionKey: false }
);

const Notices = mongoose.model('notices', noticesSchema);

module.exports = {
	Notices,
};
