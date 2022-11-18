const { Notices } = require('../db/noticesModel');

const getNotices = async category => Notices.find({ category });

const getUserNotices = async owner => Notices.find({ owner });

const getNoticesById = async id => Notices.findOne({ _id: id });

const getOneNotices = async (id, owner) => Notices.findOne({ _id: id, owner });

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
	owner,
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
		owner,
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
	getOneNotices,
	getUserNotices,
};
