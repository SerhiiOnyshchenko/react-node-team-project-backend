const { Pet } = require('../db/petsModel');
const { User } = require('../db/usersModel');
const { NoPetError } = require('../helpers/errors');
const { s3Uploadv2 } = require('./s3service');

const createPetService = async (
	{ name, birthday, breed, comments, owner },
	file
) => {
	const result = await s3Uploadv2(file);

	const newPet = await Pet.create({
		name,
		birthday,
		breed,
		comments,
		owner,
		image: result.Location,
	});
	await User.findByIdAndUpdate(owner, { $push: { pets: newPet._id } });

	return newPet;
};

const deletePetService = async (petId, owner) => {
	const pet = await Pet.findById(petId);
	if (!pet) {
		throw new NoPetError('Pet not found');
	}
	// await s3Deletev2(pet.image);
	await Pet.findByIdAndDelete(petId);
	await User.findByIdAndUpdate(owner, { $pull: { pets: pet._id } });
};

module.exports = {
	createPetService,
	deletePetService,
};
