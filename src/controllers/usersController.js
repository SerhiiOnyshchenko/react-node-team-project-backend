const {
	registration,
	userVerification,
	repeatUserVerification,
	login,
	logout,
	getUserInfoService,
	updateUserInfoService,
	addToFavoriteService,
	listFavoriteService,
	deleteFavoriteService,
} = require('../services/usersService');

// const { sendEmail } = require("../helpers/sendEmail");

const registrationController = async (req, res) => {
	const { email, password, name, phone, city } = req.body;
	const user = await registration({ email, password, name, phone, city });
	// const user = await registration(req.body);
	res.status(201).json({ user });
};

const verificationController = async (req, res) => {
	const { verificationToken } = req.params;
	await userVerification(verificationToken);
	res.json({ message: 'Verification successful' });
};

const verificationRepeatController = async (req, res) => {
	const { email } = req.body;
	await repeatUserVerification(email);
	res.json({ message: 'Verification email sent' });
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	const { token, user } = await login({ email, password });
	res.json({ token, user });
};

const logoutController = async (req, res) => {
	const { id } = req.user;
	await logout(id);
	res.status(204).json({ message: `Logout user: ${id}` });
};

const getUserInfoController = async (req, res) => {
	const { id } = req.user;
	const { user } = await getUserInfoService(id);
	res.json({ user });
};

const updateUserInfoController = async (req, res) => {
	const { id } = req.user;
	const { name, email, birthday, phone, city } = req.body;
	const { user } = await updateUserInfoService({
		id,
		name,
		email,
		birthday,
		phone,
		city,
	});
	res.json({ user });
};

const addToFavoriteController = async (req, res) => {
	const { id } = req.user;
	const noticesId = req.params.id;
	const user = await addToFavoriteService(id, noticesId);
	res.json(user);
};

const listFavoriteController = async (req, res) => {
	const { id } = req.user;
	const favorite = await listFavoriteService(id);
	res.json(favorite);
};

const deleteFavoriteController = async (req, res) => {
	const { id } = req.user;
	const noticesId = req.params.id;
	await deleteFavoriteService(id, noticesId);
	res.json('Notices delete from favorite');
};

module.exports = {
	registrationController,
	verificationController,
	verificationRepeatController,
	loginController,
	logoutController,
	getUserInfoController,
	updateUserInfoController,
	addToFavoriteController,
	listFavoriteController,
	deleteFavoriteController,
};
