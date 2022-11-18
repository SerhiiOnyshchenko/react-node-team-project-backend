const Friends = require("../db/friendsModel");

const getAllFriends = () => Friends.find();

module.exports = { getAllFriends };
