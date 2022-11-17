const { ValidationError } = require("../helpers/errors");
const { searchCitySchema } = require("../db/cityModel");

const searchCityValidation = (req, res, next) => {
  const validationResult = searchCitySchema.validate(req.query);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message));
  }
  next();
};

module.exports = {
  searchCityValidation,
};
