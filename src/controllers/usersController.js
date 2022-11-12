const { registration, login, logout } = require("../services/usersService");

const registrationController = async (req, res) => {
  const { email, password, name, phone, city } = req.body;
  const user = await registration({ email, password, name, phone, city });
  // const user = await registration(req.body);
  res.status(201).json({ user });
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

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
