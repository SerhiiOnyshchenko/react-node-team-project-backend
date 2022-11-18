const { Pet } = require('../db/petsModel');
const { NoPetError } = require('../helpers/errors');
const { s3Uploadv2 } = require('./s3service');

const createPetService = async (
	{ name, birthDate, breed, comments, userId },
	file
) => {
	const result = await s3Uploadv2(file);

	const newPet = await Pet.create({
		name,
		birthDate,
		breed,
		comments,
		userId,
		image: result.Location,
	});
	return newPet;
};

const deletePetService = async (petId, userId) => {
	const pet = await Pet.findById(petId);
	if (!pet) {
		throw new NoPetError('Pet not found');
	}
	// await s3Deletev2(pet.image);
	await Pet.findByIdAndDelete(petId);
};

module.exports = {
	createPetService,
	deletePetService,
};
