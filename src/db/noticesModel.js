const mongoose = require("mongoose");
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
    enum: ["female", "male"],
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

<<<<<<< HEAD
  category: {
    type: String,
    enum: ["lost/found", "in good hands", "sell"],
  },
  owner: {
  	type: Schema.Types.ObjectId,
  	ref: 'user',
  },
=======
	image: {
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
>>>>>>> 72f7e05ebf401e392d01e7e11c208dfe4335fe66
});

const Notices = mongoose.model("notices", noticesSchema);

module.exports = {
  Notices,
};
