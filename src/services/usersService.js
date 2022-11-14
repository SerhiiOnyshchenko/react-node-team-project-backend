require('dotenv').config();
const secret = process.env.SECRET;
// const PORT = process.env.PORT;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pet } = require('../db/petsModel');
const { User } = require('../db/usersModel');
const { NoAuthorizedError, AuthConflictError } = require('../helpers/errors');

const registration = async ({ email, password, name, phone, city }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new AuthConflictError('Email is already in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
    phone,
    city,
    name,
  });
  return newUser;
};

const login = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NoAuthorizedError('Email or password is wrong');
  }
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
  const user = await User.findById(id, '-password');
  if (!user) {
    throw new NoAuthorizedError('Not authorized');
  }
  const pets = await Pet.find({ userId: id });
  return { user: { ...user.toObject(), pets } };
};

module.exports = {
  registration,
  login,
  logout,
  getUserInfoService,
};
