const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpes");
const { getFriendsController } = require("../../controllers/friends");

router.route("/").get(asyncWrapper(getFriendsController));

module.exports = router;
