const { Pet } = require('../db/petsModel');
const { NoPetError } = require('../helpers/errors');

const createPetService = async ({ name, birthDate, breed, comments, userId }) => {
  const newPet = await Pet.create({ name, birthDate, breed, comments, userId });
  return newPet;
};

const deletePetService = async (petId, userId) => {
  const existingPet = await Pet.findOneAndDelete({ _id: petId, userId });
  if (!existingPet) {
    throw new NoPetError('Pet not found');
  }
};

module.exports = {
  createPetService,
  deletePetService,
};
