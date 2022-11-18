const express = require('express');
const {
	createPetController,
	deletePetController,
} = require('../../controllers/petsController');
const {
	addPetValidation,
	deletePetValidation,
} = require('../../middlewares/petMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpes');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');

const router = new express.Router();

router.post(
	'/',
	authMiddleware,
	uploadMiddleware.single('image'),
	addPetValidation,
	asyncWrapper(createPetController)
);
router.delete(
	'/:petId',
	authMiddleware,
	deletePetValidation,
	asyncWrapper(deletePetController)
);

module.exports = router;
