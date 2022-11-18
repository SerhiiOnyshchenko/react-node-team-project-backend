const { searchCities } = require("../services/cityService");

const searchCitiesController = async (req, res) => {
  const { q } = req.query;
  const list = await searchCities(q);
  res.json(list);
};

module.exports = { searchCitiesController };
