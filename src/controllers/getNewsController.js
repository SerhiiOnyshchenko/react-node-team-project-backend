const findNews = require('../services/newsService');

const getNewsController = async (req, res) => {

    const { page = 1, limit = 6, query } = req.query;
    const data = await findNews(page, limit, query);

    res.json({
        status: "success",
        data
    })
}

module.exports = getNewsController;