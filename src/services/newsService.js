const News = require('../db/newsModel');

const findNews = async (page, limit, query) => {
	const skip = (page - 1) * limit;
	const find =
		query === undefined
			? {}
			: {
					$or: [
						{ description: { $regex: `${query}` } },
						{ title: { $regex: `${query}` } },
					],
			  };
	const data = await News.find(find).skip(skip).limit(Number(limit));
	return data;
};

module.exports = findNews;
