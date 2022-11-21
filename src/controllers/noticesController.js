const {
	addNotices,
	getNotices,
	getNoticesById,
	removeNotices,
	getOneNotices,
	getUserNotices,
} = require('../services/noticesService');
const { WrongParamError } = require('../helpers/errors');

const listNoticesController = async (req, res) => {
	const { category } = req.query;
	const notices = await getNotices(category);
	res.json(notices);
};

const userListNoticesController = async (req, res) => {
	const { id: owner } = req.user;
	const notices = await getUserNotices(owner);
	res.json(notices);
};

const getNoticesByIdController = async (req, res) => {
	const noticesId = req.params.id;
	const notices = await getNoticesById(noticesId);
	if (!notices) {
		throw new WrongParamError('Not found');
	}
	res.json(notices);
};

const addNoticesController = async (req, res) => {
	const { id: ownerId } = req.user;
	const {
		titleOfAd,
		namePet,
		dateOfBirth,
		breed,
		sex,
		location,
		price,
		comments,
		category,
	} = req.body;
	const pet = await addNotices(
		{
			titleOfAd,
			namePet,
			dateOfBirth,
			breed,
			sex,
			location,
			price,
			comments,
			category,
			ownerId,
		},
		req.file
	);
	res.status(201).json(pet);
};

const removeNoticesController = async (req, res) => {
	const noticesId = req.params.id;
	const { id: owner } = req.user;
	const myNotices = await getOneNotices(noticesId, owner);
	if (!myNotices) {
		throw new WrongParamError('Not found');
	}
	removeNotices(noticesId);
	res.json({ message: 'notices deleted' });
};

module.exports = {
	addNoticesController,
	listNoticesController,
	getNoticesByIdController,
	removeNoticesController,
	userListNoticesController,
};
