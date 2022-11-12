const express = require('express');
const router = express.Router();
const { asyncWrapper} = require('../../helpers/apiHelpes');
const getNews = require("../../controllers/news/getNews");


router.get('/',  asyncWrapper(getNews));

module.exports = router