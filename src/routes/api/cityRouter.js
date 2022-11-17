const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpes");
const { searchCityValidation } = require("../../middlewares/cityMiddleware");
const { searchCitiesController } = require("../../controllers/cityController");

const router = new express.Router();

// .../api/cities/search?q=kher

router
  .route("/search")
  .get(searchCityValidation, asyncWrapper(searchCitiesController));

module.exports = router;
