const { getAllFriends } = require("../services/friendsService");

const getFriendsController = async (req, res) => {
  const friends = await getAllFriends();
  if (!friends) {
    res.status(400);
  }

  res.status(200).json(friends);
};

module.exports = {
  getFriendsController,
};
