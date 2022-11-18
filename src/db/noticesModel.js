const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const noticesSchema = new mongoose.Schema({
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
		enum: ['lost/found', 'in good hands', 'sell'],
	},

	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},

	image: {
		type: String,
	},
});

const Notices = mongoose.model('notices', noticesSchema);

module.exports = {
	Notices,
};
