const express = require('express');
const router = express.Router();
const { asyncWrapper} = require('../../helpers/apiHelpes');
const getNewsController = require("../../controllers/getNewsController");


router.route('/').get(asyncWrapper(getNewsController))

module.exports = router