require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { Notices } = require('../db/noticesModel');
const { s3Uploadv2 } = require('./s3service');

const secret = process.env.SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/usersModel');
const { Pet } = require('../db/petsModel');
const {
	NoAuthorizedError,
	AuthConflictError,
	ValidationError,
	WrongBodyError,
	WrongParamError,
} = require('../helpers/errors');
const { sendEmail } = require('../helpers/sendEmail');

const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
	return {
		to: email,
		subject: 'Підтвердження реєстрації на сайті',
		html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationToken}">Натиснить для підтвердження</a>`,
	};
};

const findUserByEmail = async email => {
	const user = await User.findOne({ email: { $regex: email, $options: 'i' } });
	return user;
};

const registration = async ({ email, password, name, phone, city }) => {
	const user = await findUserByEmail(email);
	if (user) {
		throw new AuthConflictError('Email is already in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = uuidv4();
	const newUser = await User.create({
		email,
		password: hashPassword,
		phone,
		city,
		name,
		verificationToken,

		image:
			'https://serhiibackend.s3.eu-central-1.amazonaws.com/upload/ef6ae7bf-ffd8-49f3-b202-5f792ad1841f-Default-avatar.jpg',
	});
	await sendEmail(createVerifyEmail(email, verificationToken));
	//  return newUser;  // TO DO uncomment !!!

	// for tests only - login user after registration
	return (await login({ email, password })).user;
	//
};

const userVerification = async verificationToken => {
	const user = await User.findOne({ verificationToken });
	if (!user) {
		throw new ValidationError(
			'User not found or verification has already been passed'
		);
	}
	user.verificationToken = '';
	user.verify = true;
	await user.save();
};

const repeatUserVerification = async email => {
	const user = await findUserByEmail(email);
	if (!user) {
		throw new ValidationError('User not found');
	}
	const verificationToken = uuidv4();
	user.verificationToken = verificationToken;
	user.verify = false;
	await user.save();
	await sendEmail(createVerifyEmail(email, verificationToken));
};

const login = async ({ email, password }) => {
	let user = await findUserByEmail(email);
	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new NoAuthorizedError('Email or password is wrong');
	}
	// for tests only - ignore user verify state flag
	// if (!user.verify) {
	// 	throw new NoAuthorizedError('Your email is not verification');
	// }
	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, secret, { expiresIn: '1h' });
	await User.findByIdAndUpdate(user._id, { token });
	user = await User.findById(user._id);
	return { token, user };
};

const logout = async id => {
	const user = await User.findById(id);
	if (!user) {
		throw new NoAuthorizedError('Not authorized');
	}
	await User.findByIdAndUpdate(id, { token: null });
};

const getUserInfoService = async id => {
	const user = await User.findById(id, '-password -token');
	if (!user) {
		throw new NoAuthorizedError('Not authorized');
	}
	const pets = await Pet.find({ owner: id });
	return { user: { ...user.toObject(), pets } };
};

const updateUserInfoService = async (
	{ id, name, email, birthday, phone, city },
	file
) => {
	let image = null;
	const userOld = await User.findOne({ _id: id });
	if (!userOld) {
		throw new NoAuthorizedError('Not authorized');
	}
	if (file) {
		// upload new file to aws
		const result = await s3Uploadv2(file);
		image = result.Location;

		// delete old file from aws
		// await s3Deletev2(userOld.image);
	} else {
		image = userOld.image;
	}
	const user = await User.findByIdAndUpdate(
		id,
		{ name, email, birthday, phone, city, image },
		{ new: true, fields: { password: 0, token: 0 } }
	);

	return { user };
};

const addToFavoriteService = async (id, noticesId) => {
	const user = await findUserByIdService(id);
	const notices = await Notices.findById(noticesId);
	if (user.favorite.find(fav => fav._id.toString() === noticesId)) {
		throw new WrongParamError('Notices has already been added to favorite');
	}
	user.favorite.push(notices);
	return user.save();
};

const listFavoriteService = async id => {
	const user = await findUserByIdService(id);
	return user.favorite;
};

const deleteFavoriteService = async (id, noticesId) => {
	const user = await findUserByIdService(id);
	if (!user.favorite.find(fav => fav._id.toString() === noticesId)) {
		throw new WrongBodyError('Not found');
	}
	const favorite = user.favorite.filter(
		fav => fav._id.toString() !== noticesId
	);
	user.favorite = favorite;
	user.save();
};

const refreshTokenService = async id => {
	const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
	const user = await User.findByIdAndUpdate(id, { token });
	if (!user) {
		throw new NoAuthorizedError('Not authorized');
	}
	return { token };
};

const findUserByIdService = async id => {
	const user = await User.findById(id).populate({
		model: 'notices',
		path: 'favorite',
	});
	return user;
};

module.exports = {
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
	refreshTokenService,
	findUserByIdService,
};
