const { createPetService, deletePetService } = require('../services/petsService');
const ObjectId = require('mongoose').Types.ObjectId;

const createPetController = async (req, res) => {
  const { name, birthDate, breed, comments } = req.body;
  const user = req.user;
  const pet = await createPetService({
    name,
    birthDate,
    breed,
    comments,
    userId: ObjectId(user.id),
  });
  res.status(201).json({ pet });
};

const deletePetController = async (req, res) => {
  const { petId } = req.params;
  const user = req.user;
  await deletePetService(petId, user.id);
  res.status(200).json({ message: 'Pet deleted' });
};

module.exports = {
  createPetController,
  deletePetController,
};
