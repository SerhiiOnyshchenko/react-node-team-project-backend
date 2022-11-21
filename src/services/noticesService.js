const { Notices } = require('../db/noticesModel');
const { s3Uploadv2 } = require('./s3service');
const { User } = require('../db/usersModel');

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
		ownerId,
	},
	file
) => {
	const result = await s3Uploadv2(file);
	const {email, phone, name} = await User.findById(ownerId);
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
		owner: {_id:ownerId, email, phone, name},
		image: result.Location,
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
