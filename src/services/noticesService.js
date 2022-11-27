const { Notices } = require('../db/noticesModel');
const { User } = require('../db/usersModel');
const { s3Uploadv2 } = require('./s3service');

const getNotices = async ({ category, q = "", page = 1, limit = 10 }) => {
	const noticesToSkip = (page - 1) * limit;
	const noticesFilter = { titleOfAd: { $regex: q, $options: "i" }, category };
	const noticesSort = { _id: -1 };

	const notices = await Notices.find(noticesFilter).sort(noticesSort).skip(noticesToSkip).limit(limit);
	const totalCount = await Notices.find(noticesFilter).count();

	return {notices, totalCount};
};

const getUserNotices = async ownerId =>
	Notices.find({
		'owner._id': ownerId,
	});

const getNoticesById = async id => Notices.findOne({ _id: id });

const getOneNotices = async (id, ownerId) => Notices.findOne({ _id: id, 'owner._id': ownerId, });

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
	const { _id, email, phone, name } = await User.findById(ownerId);

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
		owner: { _id, email, phone, name },
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
