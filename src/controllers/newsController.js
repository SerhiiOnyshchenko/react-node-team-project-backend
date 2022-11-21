const findNews = require('../services/newsService');

const getNewsController = async (req, res) => {
	const { page = 1, query } = req.query;
	const data = await findNews(page, query);

	res.json(data);
};

module.exports = getNewsController;
