const { getAllFriends } = require('../services/friendsService');

const getFriendsController = async (req, res) => {
	const friends = await getAllFriends();
	res.json(friends);
};

module.exports = {
	getFriendsController,
};
