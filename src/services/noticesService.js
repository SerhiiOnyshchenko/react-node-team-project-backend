const { Notices } = require('../db/noticesModel');

const getNotices = async category => Notices.find({ category });

const getNoticesById = async id => Notices.findOne({ _id: id });

const addNotices = async ({
	titleOfAd,
	namePet,
	dateOfBirch,
	breed,
	sex,
	location,
	price,
	comments,
	category,
}) => {
	const notices = new Notices({
		titleOfAd,
		namePet,
		dateOfBirch,
		breed,
		sex,
		location,
		price,
		comments,
		category,
	});
	await notices.save();
	return notices;
};

const removeNotices = async id => {
	await Notices.findByIdAndDelete({ _id: id });
};

module.exports = {
	addNotices,
	getNotices,
	getNoticesById,
	removeNotices,
};
