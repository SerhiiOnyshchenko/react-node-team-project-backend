const { getAllFriends } = require('../services/friendsService');

const getFriendsController = async (req, res) => {
	const friends = await getAllFriends();
	res.status(200).json(friends);
};

module.exports = {
	getFriendsController,
};
