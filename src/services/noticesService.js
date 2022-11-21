const { Notices } = require('../db/noticesModel');
const { s3Uploadv2 } = require('./s3service');

const getNotices = async category => Notices.find({ category });

const getUserNotices = async owner => Notices.find({ owner });

const getNoticesById = async id => Notices.findOne({ _id: id });

const getOneNotices = async (id, owner) => Notices.findOne({ _id: id, owner });

const addNotices = async (
	{
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
	},
	file
) => {
	const result = await s3Uploadv2(file);

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
		image: result.Location,
	});
	await notices.save();
	return notices;
};

const removeNotices = async id => {
	await Notices.findByIdAndDelete({ _id: id });
};

const searchByTitleService = async ({ searchQuery = "" }) => { 
	const notices = await Notices.find({ titleOfAd: { $regex: searchQuery, $options: "i" } });
	return notices;
}

module.exports = {
	addNotices,
	getNotices,
	getNoticesById,
	removeNotices,
	getOneNotices,
	getUserNotices,
	searchByTitleService
};
