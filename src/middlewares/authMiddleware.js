const jwt = require('jsonwebtoken');
const { User } = require('../db/usersModel');
const { NoAuthorizedError } = require('../helpers/errors');
const secret = process.env.SECRET;

module.exports = {
	authMiddleware: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			if (!authorization) {
				next(
					new NoAuthorizedError(
						'Please, provide a token in request authorization header'
					)
				);
			}
			const [bearer, token] = authorization.split(' ');
			if (bearer !== 'Bearer' || !token) {
				next(new NoAuthorizedError('Not authorized'));
			}
			const user = jwt.decode(token, secret);
			const userFind = await User.findById(user.id);
			if (!userFind || token !== userFind.token) {
				next(new NoAuthorizedError('Not authorized'));
			}
			req.user = user;
			next();
		} catch (error) {
			next(new NoAuthorizedError('Not authorized'));
		}
	},
};
