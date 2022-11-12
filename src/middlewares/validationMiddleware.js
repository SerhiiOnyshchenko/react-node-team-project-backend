const { schemas } = require("../models/user");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactValidation: (req, res, next) => {
    next();
  },

  registerUserValidation: (req, res, next) => {
    const validationResult = schemas.registerSchema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
  loginUserValidation: (req, res, next) => {
    const validationResult = schemas.loginSchema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
};
