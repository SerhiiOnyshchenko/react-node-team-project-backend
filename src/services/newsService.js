const News = require('../db/newsModel');

const findNews = async (page, query) => {
	const skip = (page - 1) * 6;
	const find =
		query === undefined
			? {}
			: {
					$or: [
						{ description: { $regex: `${query}` } },
						{ title: { $regex: `${query}` } },
					],
			  };
	const data = await News.find(find).skip(skip).limit(6);
	const totalPages = await News.find().count();

	return { data, page, totalPages };
};

module.exports = findNews;
