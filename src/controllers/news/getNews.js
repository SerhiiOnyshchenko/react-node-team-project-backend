const News = require("../../db/news");

const getNews = async (req, res) => {
    // without pagination

    const result = await News.find();

    // with pagination
    // const { page = 1, limit = 6 } = req.query;
    // const skip = (page - 1) * limit;

    // const result = await News.find({}, null, { skip, limit: Number(limit) });


    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getNews;