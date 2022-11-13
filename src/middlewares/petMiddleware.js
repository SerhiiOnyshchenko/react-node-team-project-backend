const { schemas } = require('../db/petsModel');
const { ValidationError } = require('../helpers/errors');
const mongoose = require('mongoose');

module.exports = {
  addPetValidation: (req, res, next) => {
    const validationResult = schemas.createPetSchema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },

  deletePetValidation: (req, res, next) => {
    const params = req.params;

    if (!mongoose.isValidObjectId(params.petId)) {
      next(new ValidationError('Pet ID is invalid'));
    }
    next();
  },
};
