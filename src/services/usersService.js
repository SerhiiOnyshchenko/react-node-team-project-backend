require("dotenv").config();
// const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");

const secret = process.env.SECRET;
// const PORT = process.env.PORT;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/usersModel");
const {
  NoAuthorizedError,
  AuthConflictError,
  ValidationError,
} = require("../helpers/errors");
const { sendEmail } = require("../helpers/sendEmail");

const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationToken}">Натиснить для підтвердження</a>`,
  };
};

const registration = async ({ email, password, name, phone, city }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new AuthConflictError("Email is already in use");
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
  });
  await sendEmail(createVerifyEmail(email, verificationToken));
  return newUser;
};

const userVerification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new ValidationError(
      "User not found or verification has already been passed"
    );
  }
  user.verificationToken = "";
  user.verify = true;
  await user.save();
};

const repeatUserVerification = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ValidationError("User not found");
  }
  // if (user.verify) {
  //   throw new ValidationError("Verification has already been passed");
  // }
  const verificationToken = uuidv4();
  user.verificationToken = verificationToken;
  user.verify = false;
  await user.save();
  await sendEmail(createVerifyEmail(email, verificationToken));
};

const login = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NoAuthorizedError("Email or password is wrong");
  }
  if (!user.verify) {
    throw new NoAuthorizedError("Your email is not verification");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  user = await User.findById(user._id);
  return { token, user };
};

const logout = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NoAuthorizedError("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: null });
};

module.exports = {
  registration,
  userVerification,
  repeatUserVerification,
  login,
  logout,
};
