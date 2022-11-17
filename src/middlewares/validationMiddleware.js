const Joi = require("joi");
const { schemas } = require("../db/usersModel");
const { WrongBodyError, ValidationError } = require("../helpers/errors");

const validateObjectId = (req, res, next) => {
  const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
  const validId = schema.validate(req.params.id);
  if (validId.error) {
    return next(new WrongBodyError("Not found"));
  }
};

module.exports = {
  getByIdValidate: (req, res, next) => {
    validateObjectId(req, res, next);
    next();
  },
  addNoticesValidation: (req, res, next) => {
    const schema = Joi.object({
      titleOfAd: Joi.string().required(),
      namePet: Joi.string(),
      dateOfBirth: Joi.number(),
      breed: Joi.string(),
      sex: Joi.string(),
      location: Joi.string().required(),
      price: Joi.string().required(),
      comments: Joi.string(),
      category: Joi.string(),
    });
    const validResult = schema.validate(req.body);

    if (validResult.error) {
      const [result] = validResult.error.details;
      const [missingParam] = result.path;
      return next(
        new ValidationError(`missing required ${missingParam} field`)
      );
    }
    next();
  },
  removeNoticesValidation: (req, res, next) => {
    validateObjectId(req, res, next);
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
  emailBodyValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },
};
